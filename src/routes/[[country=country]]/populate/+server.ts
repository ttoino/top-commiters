import { connect } from "$lib/db";
import { getOctokit } from "$lib/gh";
import User, { type IUser } from "$lib/models/User";
import type mongoose from "mongoose";
import type { PageServerLoad } from "../$types";

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

export const GET: PageServerLoad = async () => {
    const octokit = await getOctokit();

    const users: mongoose.Document<unknown, unknown, IUser>[] = [];
    let after = undefined;
    let hasNextPage = true;

    while (hasNextPage) {
        const search: Search = await octokit.graphql<Search>(
            `
            query($after: String) {
                search(query: "location:portugal", type: USER, after: $after, first: 25) {
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
                        }
                    }
                }
            }
        `,
            {
                after,
            }
        );

        hasNextPage = search.search.pageInfo.hasNextPage;
        after = search.search.pageInfo.endCursor;

        users.push(
            ...search.search.nodes
                .map((u) => {
                    const commits =
                        u.contributionsCollection?.totalCommitContributions ??
                        0;
                    const issues =
                        u.contributionsCollection?.totalIssueContributions ?? 0;
                    const pullRequests =
                        u.contributionsCollection
                            ?.totalPullRequestContributions ?? 0;
                    const reviews =
                        u.contributionsCollection
                            ?.totalPullRequestReviewContributions ?? 0;
                    const contributions =
                        commits + issues + pullRequests + reviews;
                    const privateContributions =
                        contributions +
                        (u.contributionsCollection
                            ?.restrictedContributionsCount ?? 0);

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
                    });
                })
        );
    }

    await connect();
    await User.deleteMany({});
    await User.insertMany(users, { lean: true, ordered: false });

    return new Response(JSON.stringify(users), {
        headers: { "content-type": "application/json" },
    });
};
