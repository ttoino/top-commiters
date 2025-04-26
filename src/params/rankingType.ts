import type { ParamMatcher } from "@sveltejs/kit";

import { rankingTypes } from "$lib/rankingTypes";

export const match: ParamMatcher = (param) => {
    const rankingType = param.toLowerCase();

    return rankingType in rankingTypes;
};
