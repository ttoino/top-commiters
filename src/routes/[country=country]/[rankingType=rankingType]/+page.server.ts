import type { PageServerLoad } from "./$types";
import { rankingTypes, type RankingType } from "$lib/rankingTypes";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const rankingType = params.rankingType.toLowerCase() as RankingType;
    const prop = rankingTypes[rankingType].prop;

    const res = await fetch(`/${params.country}/data.json`);
    const data = await res.json();
    const users = data.users.sort((a, b) => b[prop] - a[prop]).slice(0, 100);

    return {
        ...data,
        rankingType,
        users,
    };
};
