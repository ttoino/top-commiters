import { connect } from "$lib/db";
import User from "$lib/models/User";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    await connect();

    const users = await User.find()
        .sort({ contributions: "desc" })
        .limit(100)
        .lean();

    return { users: JSON.parse(JSON.stringify(users)) };
};
