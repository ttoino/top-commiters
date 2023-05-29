import { connect, disconnect } from "$lib/db";
import { getOctokit } from "$lib/gh";
import User, { countryModels, type IUser } from "$lib/models/User";
import type mongoose from "mongoose";
import type { PageServerLoad } from "../$types";
import countries from "$lib/countries.json";
import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import { connection } from "mongoose";
import Metadata from "$lib/models/Metadata";

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

export const GET: PageServerLoad = async ({ params, url }) => {
    if (url.searchParams.get("key") !== env.POPULATE_KEY)
        throw redirect(308, url.pathname.replace("/populate", "/contribs"));

    const octokit = await getOctokit();

    const country = params.country.toUpperCase() as keyof typeof countries;

    const q = country !== "GLOBAL" ? `location:${countries[country].name}` : "";

    const users: mongoose.Document<unknown, unknown, IUser>[] = [];
    let after = undefined;
    let hasNextPage = true;

    while (hasNextPage) {
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
            }
        );

        hasNextPage = search.search.pageInfo.hasNextPage;
        after = search.search.pageInfo.endCursor;

        users.push(
            ...search.search.nodes.map((u) => {
                const commits =
                    u.contributionsCollection?.totalCommitContributions ?? 0;
                const issues =
                    u.contributionsCollection?.totalIssueContributions ?? 0;
                const pullRequests =
                    u.contributionsCollection?.totalPullRequestContributions ??
                    0;
                const reviews =
                    u.contributionsCollection
                        ?.totalPullRequestReviewContributions ?? 0;
                const contributions = commits + issues + pullRequests + reviews;
                const privateContributions =
                    contributions +
                    (u.contributionsCollection?.restrictedContributionsCount ??
                        0);

                return new User({
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
                    followers: u.followers?.totalCount ?? 0,
                });
            })
        );
    }

    const model = country ? countryModels[country] : User;

    await connect();
    await model.deleteMany({});
    try {
        await model.insertMany(users, { ordered: false });
    } catch {
        // Do nothing
    }

    if (connection.readyState === 0) await connect();

    const minFollowers =
        (
            await model.aggregate([
                {
                    $group: {
                        _id: null,
                        minFollowers: { $min: "$followers" },
                    },
                },
            ])
        )?.[0]?.minFollowers ?? 0;

    const numberOfUsers = await model.countDocuments();

    if (connection.readyState === 0) await connect();

    await Metadata.updateOne(
        { code: country },
        { code: country, numberOfUsers, minFollowers },
        { upsert: true }
    );
    await disconnect();

    throw redirect(307, url.pathname.replace("/populate", "/contribs"));
};
