import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const assetFileNames = '[name]-[hash][extname]'

export default {
	input: 'src/components/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			assetFileNames
		},
		{
			file: pkg.module,
			format: 'es',
			assetFileNames
		}
	],
	external: ['react'],
	plugins: [
		resolve(),
		commonjs(),
		styles(),
		typescript({
			tsconfig: 'typescript.rollup.json',
			useTsconfigDeclarationDir: true
		})
	]
}
