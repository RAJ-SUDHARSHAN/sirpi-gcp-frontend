import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Enforce stricter TypeScript rules to catch issues before Docker build
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Allow unused args prefixed with _
          varsIgnorePattern: "^_", // Allow unused vars prefixed with _
          caughtErrorsIgnorePattern: "^_", // Allow unused errors prefixed with _
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Warn on explicit any usage
      "no-console": "off", // Allow console logs (useful for debugging)
    },
  },
];

export default eslintConfig;
