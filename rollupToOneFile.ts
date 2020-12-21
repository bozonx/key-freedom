import * as rollup from 'rollup';
import {ModuleFormat, OutputOptions, RollupOptions} from 'rollup';
import { terser } from 'rollup-plugin-terser';

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');

const tsConfig: any = require('./tsconfig.json');


export default async function rollupToOneFile (
  name: string,
  indexFilePath: string,
  outputFilePath: string,
  globals?: {[index: string]: string},
  external?: string[]
) {
  const inputOptions: RollupOptions = {
    input: indexFilePath,
    external,
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            ...tsConfig.compilerOptions,
            module: 'ESNext',
          }
        }
      }),
      // Allow bundling cjs modules
      resolve({
        extensions: ['.ts', '.js'],
        preferBuiltins: true,
      }),
      // Allow node_modules resolution
      commonjs({
        include: 'node_modules/**'
      }),
      // minimize
      terser(),
    ],
  };
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  const format: ModuleFormat = 'umd';
  const outputOptions: OutputOptions = {
    name,
    file: outputFilePath,
    format,
    //sourcemap: useSourceMaps,
    globals,
  };

  // or write the bundle to disk
  await bundle.write(outputOptions);
}
