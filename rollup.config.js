import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript';

const plugins = [
    commonjs(),
    resolve(),
    typescript({
        target: "es5",
        module: "es2015"
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: './src/index.ts',
    output: {
        file: `dist/iota-area-codes${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'IotaAreaCodes',
        compact: process.env.MINIFY
    },
    plugins
}