import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const theme = cookies.get("theme") ?? "light";
    return { theme };
};
