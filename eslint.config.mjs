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
      "@typescript-eslint/no-explicit-any": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unused-state": "error",
      "no-unused-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "array-callback-return": "off",
      "react/self-closing-comp": "warn",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
