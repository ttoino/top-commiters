import { connect } from "$lib/db";
import User from "$lib/models/User";
import type { PageServerLoad } from "./$types";
import countries from "$lib/countries.json";
import { rankingTypes, type RankingType } from "$lib/rankingTypes";

export const load: PageServerLoad = async ({ params }) => {
    await connect();

    const rankingType = (params.rankingType?.toLowerCase() ??
        "contribs") as RankingType;
    const prop = rankingTypes[rankingType].prop;

    const users = await User.find()
        .sort({ [prop]: "desc" })
        .limit(100)
        .lean();

    const param = params.country?.toUpperCase() as
        | keyof typeof countries
        | undefined;
    const country = param ? countries[param] : null;

    return {
        country,
        users: JSON.parse(JSON.stringify(users)),
        rankingType,
    };
};
