import type Response from "$lib/Response";
import type User from "$lib/User";

import { json } from "@sveltejs/kit";
import { dev } from "$app/environment";
import countries from "$lib/countries.json";
import { getOctokit } from "$lib/gh";

import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

export const entries: EntryGenerator = () =>
    Object.keys(countries).map((country) => ({
        country,
    }));

interface Search {
    search: {
        nodes: {
            avatarUrl: string;
            contributionsCollection?: {
                restrictedContributionsCount: number;
                totalCommitContributions: number;
                totalIssueContributions: number;
                totalPullRequestContributions: number;
                totalPullRequestReviewContributions: number;
            };
            followers: {
                totalCount: number;
            };
            login: string;
            name?: string;
            url: string;
        }[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
        };
        userCount: number;
    };
}

export const GET: RequestHandler = async ({ fetch, params }) => {
    const octokit = await getOctokit();

    const countryCode = params.country.toUpperCase() as keyof typeof countries;
    const country = countries[countryCode];

    console.log(`${country.flag} Fetching users for ${country.name}`);

    const q =
        "type:user " + countryCode !== "GLOBAL"
            ? [country.name, ...country.alias]
                  .map((c) => `location:"${c}"`)
                  .join(" ")
            : "";

    const users: Map<string, User> = new Map();
    let after = undefined;
    let hasNextPage = true;
    let minFollowers: number | undefined = undefined;

    let errorCount = 0;

    while (hasNextPage && (!dev || users.size < 1)) {
        let search: Search;
        try {
            search = await octokit.graphql<Search>(
                `
                query($after: String, $q: String!, $count: Int!) {
                    search(query: $q, type: USER, after: $after, first: $count) {
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                        nodes {
                            ... on User {
                                name
                                login
                                avatarUrl
                                url
                                contributionsCollection {
                                    totalCommitContributions
                                    totalIssueContributions
                                    totalPullRequestContributions
                                    totalPullRequestReviewContributions
                                    restrictedContributionsCount
                                }
                                followers {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            `,
                {
                    after,
                    count: Math.round(50 / (errorCount + 1)),
                    q,
                    request: { fetch },
                },
            );
        } catch {
            errorCount++;
            console.error(
                `${country.flag} Caught ${errorCount} error${
                    errorCount > 1 ? "s" : ""
                } fetching users for ${country.name}`,
            );

            if (errorCount > 10) break;

            continue;
        }

        hasNextPage = search.search.pageInfo.hasNextPage;
        after = search.search.pageInfo.endCursor;

        search.search.nodes.forEach((u) => {
            const commits =
                u.contributionsCollection?.totalCommitContributions ?? 0;
            const issues =
                u.contributionsCollection?.totalIssueContributions ?? 0;
            const pullRequests =
                u.contributionsCollection?.totalPullRequestContributions ?? 0;
            const reviews =
                u.contributionsCollection
                    ?.totalPullRequestReviewContributions ?? 0;
            const contributions = commits + issues + pullRequests + reviews;
            const privateContributions =
                contributions +
                (u.contributionsCollection?.restrictedContributionsCount ?? 0);
            const followers = u.followers?.totalCount ?? 0;

            minFollowers = Math.min(
                minFollowers ?? followers,
                followers ?? Infinity,
            );

            if (u.login)
                users.set(u.login, {
                    avatar: u.avatarUrl,
                    commits,
                    contributions,
                    followers,
                    issues,
                    login: u.login,
                    name: u.name,
                    privateContributions,
                    pullRequests,
                    reviews,
                    url: u.url,
                });
        });

        console.log(
            `${country.flag} Fetched ${users.size} users for ${country.name}`,
        );
    }

    console.log(`${country.flag} Finished fetching users for ${country.name}`);

    return json({
        country,
        countryCode,
        minFollowers: minFollowers ?? 0,
        numberOfUsers: users.size,
        updatedAt: new Date().toISOString(),
        users: [...users.values()],
    } satisfies Response);
};
