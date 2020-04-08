import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import ts from "@wessberg/rollup-plugin-ts";
import babel from "rollup-plugin-babel";
import clean from "rollup-plugin-clean";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg["umd:main"],
      format: "umd",
      name: "loadingState",
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [clean(), ts(), babel(), terser()],
};
