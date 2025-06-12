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
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },

    perfectionist.configs["recommended-alphabetical"],
    {
        rules: Object.fromEntries(
            [
                "classes",
                "enums",
                "exports",
                "interfaces",
                "imports",
                "named-exports",
                "modules",
                "named-imports",
                "object-types",
                "objects",
                "variable-declarations",
            ].map((rule) => [
                `perfectionist/sort-${rule}`,
                [
                    "error",
                    {
                        partitionByComment: "^@sort",
                    },
                ],
            ]),
        ),
    },

    ...svelte.configs.all,
    {
        rules: {
            "svelte/block-lang": [
                "error",
                {
                    script: ["ts"],
                },
            ],
            "svelte/consistent-selector-style": "off",
            "svelte/experimental-require-strict-events": "off",
            "svelte/no-inline-styles": "off",
            "svelte/no-unused-class-name": "off",
            "svelte/require-optimized-style-attribute": "off",
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

    prettier,
    ...svelte.configs.prettier,
);
