import { getOctokit } from "$lib/gh";
import type { EntryGenerator, RequestHandler } from "./$types";
import countries from "$lib/countries.json";
import type User from "$lib/User";
import { dev } from "$app/environment";
import { json } from "@sveltejs/kit";

export const prerender = true;

export const entries: EntryGenerator = () =>
    Object.keys(countries).map((country) => ({
        country,
    }));

interface Search {
    search: {
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        };
        userCount: number;
        nodes: {
            name?: string;
            login: string;
            avatarUrl: string;
            url: string;
            contributionsCollection?: {
                totalCommitContributions: number;
                totalIssueContributions: number;
                totalPullRequestContributions: number;
                totalPullRequestReviewContributions: number;
                restrictedContributionsCount: number;
            };
            followers: {
                totalCount: number;
            };
        }[];
    };
}

export const GET: RequestHandler = async ({ params }) => {
    const octokit = await getOctokit();

    const countryCode = params.country.toUpperCase() as keyof typeof countries;
    const country = countries[countryCode];

    console.log("Fetching users for", country.name);

    const q =
        countryCode !== "GLOBAL"
            ? [country.name, ...country.alias]
                  .map((c) => `location:"${c}"`)
                  .join(" ")
            : "";

    const users: Map<string, User> = new Map();
    let after = undefined;
    let hasNextPage = true;
    let minFollowers: number | undefined = undefined;

    while (hasNextPage && (!dev || users.size < 1)) {
        const search: Search = await octokit.graphql<Search>(
            `
            query($after: String, $q: String!) {
                search(query: $q, type: USER, after: $after, first: 10) {
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
                q,
            },
        );

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

            minFollowers = Math.min(minFollowers ?? followers, followers);

            if (u.login)
                users.set(u.login, {
                    name: u.name,
                    login: u.login,
                    avatar: u.avatarUrl,
                    url: u.url,
                    commits,
                    issues,
                    pullRequests,
                    reviews,
                    contributions,
                    privateContributions,
                    followers,
                });
        });

        console.log("Fetched", users.size, "users for", country.name);
    }

    return json({
        country,
        countryCode,
        minFollowers: minFollowers ?? 0,
        numberOfUsers: users.size,
        updatedAt: new Date().toISOString(),
        users: [...users.values()],
    });
};
