import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'umd',
            sourcemap: 'inline',
        },
    ],
    plugins: [
        babel({
            presets: [
                ['@babel/preset-react', { modules: false }],
                //['env', { modules: false }]
            ],
            babelrc: false,
            extensions: [
                ...DEFAULT_EXTENSIONS
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties',
            ],
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        terser()
    ]
};
