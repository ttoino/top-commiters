import {
    GH_APP_ID,
    GH_APP_PRIVATE_KEY,
    GH_INSTALLATION_ID,
} from "$env/static/private";
import { App } from "octokit";

export const getOctokit = async () => {
    const app = new App({
        appId: GH_APP_ID,
        privateKey: GH_APP_PRIVATE_KEY,
    });

    const octokit = await app.getInstallationOctokit(
        parseInt(GH_INSTALLATION_ID),
    );

    return octokit;
};
