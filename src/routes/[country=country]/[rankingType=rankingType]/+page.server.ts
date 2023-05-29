import { connect } from "$lib/db";
import { countryModels } from "$lib/models/User";
import type { PageServerLoad } from "./$types";
import countries from "$lib/countries.json";
import { rankingTypes, type RankingType } from "$lib/rankingTypes";
import { disconnect } from "mongoose";

export const load: PageServerLoad = async ({ params, cookies }) => {
    await connect();

    const rankingType = params.rankingType.toLowerCase() as RankingType;
    const prop = rankingTypes[rankingType].prop;

    const param = params.country.toUpperCase() as keyof typeof countries;
    const country = countries[param];

    const model = countryModels[param];

    const users = await model
        .find()
        .sort({ [prop]: "desc" })
        .limit(100)
        .lean();

    await disconnect();

    const theme = cookies.get("theme") ?? "light";

    return await {
        theme,
        country,
        users: JSON.parse(JSON.stringify(users)),
    };
};