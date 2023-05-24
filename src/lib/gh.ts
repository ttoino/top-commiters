import { env } from "$env/dynamic/private";
import { App } from "octokit";

export const getOctokit = async () => {
    const app = new App({
        appId: env.GH_APP_ID,
        privateKey: env.GH_APP_PRIVATE_KEY,
    });

    const octokit = await app.getInstallationOctokit(
        parseInt(env.GH_INSTALLATION_ID)
    );

    return octokit;
};
