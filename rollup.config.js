const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const external = require('rollup-plugin-peer-deps-external');
const path = require("path");
const fs = require("fs");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = fs
  .readdirSync(path.join(__dirname, "webviews", "src"))
  .map((input) => {
    const name = input.split(".")[0];
    return {
      input: "webviews/src/" + input,
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "out/compiled/" + name + ".js",

  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    external(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
        tsconfig: "webviews/tsconfig.json",
        sourceMap: !isProduction,
        inlineSources: !isProduction,
      }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    }),
    isProduction ? null : serve({ contentBase: ['dist', 'public'], port: 3000 }),
    isProduction ? null : livereload('dist'),
  ],
  watch: {
    clearScreen: false,
  },
};
});

