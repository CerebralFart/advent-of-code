import resolve from '@rollup/plugin-node-resolve';
import dynamicImportVariables from "@rollup/plugin-dynamic-import-vars";
import typescript from 'rollup-plugin-typescript2';
import {defineConfig} from "rollup";

export default defineConfig({
    input: 'src/app.ts',
    output: {
        dir: 'dist'
    },
    plugins: [
        resolve(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        dynamicImportVariables({warnOnError: true}),
    ],
})