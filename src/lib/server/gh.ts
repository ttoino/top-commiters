import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import {
    GH_APP_ID,
    GH_APP_PRIVATE_KEY,
    GH_INSTALLATION_ID,
} from "$env/static/private";

export const octokit = new (Octokit.plugin(paginateGraphQL, retry, throttling))(
    {
        auth: {
            appId: GH_APP_ID,
            installationId: parseInt(GH_INSTALLATION_ID),
            privateKey: GH_APP_PRIVATE_KEY,
        },
        authStrategy: createAppAuth,
        request: {
            retries: 10,
            retryAfter: 60,
        },
        retry: { doNotRetry: [] },
        throttle: {
            onRateLimit: () => true,
            onSecondaryRateLimit: () => true,
        },
        userAgent: "commits.toino.pt",
    },
);
