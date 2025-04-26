export const rankingTypes = {
    commits: {
        icon: "git-commit",
        prop: "commits",
        title: "Commits",
    },
    contribs: {
        icon: "graph",
        prop: "contributions",
        title: "Contributions",
    },
    issues: {
        icon: "issue-opened",
        prop: "issues",
        title: "Issues",
    },
    private: {
        icon: "lock",
        prop: "privateContributions",
        title: "Private Contributions",
    },
    prs: {
        icon: "git-pull-request",
        prop: "pullRequests",
        title: "Pull Requests",
    },
    reviews: {
        icon: "code-review",
        prop: "reviews",
        title: "Reviews",
    },
} as const;

export type RankingType = keyof typeof rankingTypes;

export const rankingTypeIndices = Object.keys(rankingTypes) as RankingType[];
