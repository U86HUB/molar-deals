
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "warn", // Keep it as warning
      "@typescript-eslint/no-explicit-any": "warn", // Add no-explicit-any rule
      "@typescript-eslint/strict-boolean-expressions": "warn", // Add strict boolean expressions
      "@typescript-eslint/no-unnecessary-condition": "warn", // Catch unnecessary conditions
      "@typescript-eslint/no-unsafe-assignment": "warn", // Prevent unsafe type assignments
      "@typescript-eslint/no-floating-promises": "warn", // Make sure promises are handled
      "no-fallthrough": "error", // Prevent fallthrough cases in switch
    },
  }
);
