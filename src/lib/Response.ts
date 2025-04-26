import type countries from "./countries.json";
import type User from "./User";

export default interface Response {
    country: (typeof countries)[keyof typeof countries];
    countryCode: string;
    minFollowers: number;
    numberOfUsers: number;
    updatedAt: string;
    users: User[];
}
