const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const typescript = require('rollup-plugin-typescript2');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  input: 'webviews/index.tsx',
  output: {
    file: 'out/compiled/main.js',
    format: 'iife',
    sourcemap: !isProduction,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
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
};
