export default interface User {
    name?: string;
    login: string;
    url: string;
    avatar: string;
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
    contributions: number;
    privateContributions: number;
    followers: number;
}
