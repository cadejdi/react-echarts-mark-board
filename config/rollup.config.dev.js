import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import react from 'react';
import reactDom from 'react-dom';

export default {
    input: 'src/docs/index.tsx',
    output: [{
        file: 'docs/example/index.js',
        format: 'iife',
        sourcemap: true,
    }],
    plugins: [
        typescript({
            tsconfigDefaults: {
                compilerOptions: {
                    declaration: true,
                    jsx: 'react',
                    target: "ES5",
                    allowSyntheticDefaultImports: true
                },
            },
            clean: true
        }),
        postcss({
            modules: false,
            extensions: ['.css', '.scss', '.sass'],
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                react: Object.keys(react),
                'react-dom': Object.keys(reactDom)
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve(),

        serve({
            contentBase: 'docs/',
            port: 8080
        }),
        livereload({
            watch: "docs/example"
        })
    ],
};