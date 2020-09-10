import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import external from 'rollup-plugin-peer-deps-external';
import builtins from 'rollup-plugin-node-builtins';

const EXTERNALS = {
    'react': 'React',
    'react-dom': 'ReactDOM',
};

const Global = `var process = {
  env: {
    NODE_ENV: 'production'
  }
}`

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'umd',
            sourcemap: 'inline',
            banner: Global
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
        serve({
            contentBase: ['dist', 'public'],
        }),
        commonjs({
            include: [
                'node_modules/**',
            ],
            browser: true,
            preferBuiltins: false,
            // if true then uses of `global` won't be dealt with by this plugin
            ignoreGlobal: false,  // Default: false
            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: false  // Default: true
        }),
        nodeResolve({
            browser: true,
            jsnext: true,
            main: true,
            preferBuiltins: false,
            ignoreGlobal: false,
            include: ['node_modules/**'],
            skip: ['react', 'react-dom'],
        }),
/*        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        })*/
        external({
            includeDependencies: true,
        }),
        globals(),
        builtins(),
    ]
};
