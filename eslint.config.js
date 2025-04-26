import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

import svelteConfig from "./svelte.config.js";
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.strict,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    perfectionist.configs["recommended-alphabetical"],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
        ignores: ["eslint.config.js", "svelte.config.js"],

        languageOptions: {
            parserOptions: {
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                projectService: true,
                svelteConfig,
            },
        },
    },
);
