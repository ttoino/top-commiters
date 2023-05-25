export const rankingTypes = {
    commits: {
        prop: "commits",
        title: "Commits",
        icon: "git-commit",
    },
    prs: {
        prop: "pullRequests",
        title: "Pull Requests",
        icon: "git-pull-request",
    },
    issues: {
        prop: "issues",
        title: "Issues",
        icon: "issue-opened",
    },
    reviews: {
        prop: "reviews",
        title: "Reviews",
        icon: "code-review",
    },
    contribs: {
        prop: "contributions",
        title: "Contributions",
        icon: "graph",
    },
    private: {
        prop: "privateContributions",
        title: "Private Contributions",
        icon: "lock",
    },
} as const;

export type RankingType = keyof typeof rankingTypes;

export const rankingTypeIndices = Object.keys(rankingTypes) as RankingType[];
