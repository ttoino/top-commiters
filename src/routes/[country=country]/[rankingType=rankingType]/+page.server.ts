import { connect } from "$lib/db";
import { countryModels, type IUser } from "$lib/models/User";
import type { PageServerLoad } from "./$types";
import countries from "$lib/countries.json";
import { rankingTypes, type RankingType } from "$lib/rankingTypes";
import { disconnect } from "mongoose";
import Metadata, { type IMetadata } from "$lib/models/Metadata";

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

    const metadata = await Metadata.findOne({ code: param }).lean();

    await disconnect();

    const theme = cookies.get("theme") ?? "light";

    return await {
        theme,
        country,
        users: JSON.parse(JSON.stringify(users)) as IUser[],
        metadata: JSON.parse(JSON.stringify(metadata)) as IMetadata,
    };
};
