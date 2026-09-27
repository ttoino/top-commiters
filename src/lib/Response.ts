import type User from "./User.js";

export default interface Response {
    country: Country;
    countryCode: string;
    minFollowers: number;
    numberOfUsers: number;
    updatedAt: string;
    users: User[];
}

interface Country {
    alias: string[];
    code: string;
    except?: string[];
    flag: string;
    name: string;
}
