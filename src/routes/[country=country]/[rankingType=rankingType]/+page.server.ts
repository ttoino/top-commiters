import type Response from "$lib/Response.js";

import { type RankingType, rankingTypes } from "$lib/rankingTypes.js";

import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch, params }) => {
    const rankingType = params.rankingType.toLowerCase() as RankingType;
    const prop = rankingTypes[rankingType].prop;

    const res = await fetch(`/${params.country}/data.json`);
    const data = (await res.json()) as Response;
    const users = data.users
        .sort(
            (a: Response["users"][number], b: Response["users"][number]) =>
                b[prop] - a[prop],
        )
        .slice(0, 100);

    return {
        ...data,
        rankingType,
        users,
    };
};
