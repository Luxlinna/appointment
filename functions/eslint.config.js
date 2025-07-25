import {FlatCompat} from "@eslint/eslintrc";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    extends: ["eslint:recommended"],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: {
      node: true,
      es2020: true,
    },
  },
];

