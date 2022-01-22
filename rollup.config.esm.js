import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/bundle.esm.js',
            format: 'esm'
        },
        plugins: [typescript(), babel({ babelHelpers: 'bundled' })]
    }, {
        input: 'src/index.ts',
        output: {
            file: 'dist/bundle.js',
            format: 'iife',
            name: 'swtfParser'
        },
        plugins: [typescript(), babel({ babelHelpers: 'bundled' })]
    }
];