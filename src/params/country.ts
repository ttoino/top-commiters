import type { ParamMatcher } from "@sveltejs/kit";
import countries from "$lib/countries.json";

export const match: ParamMatcher = (param) => {
    const country = param.toUpperCase();

    return country in countries;
};
