import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import svgr from '@svgr/rollup'
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
	external: ['antd', 'react'],
	plugins: [
		resolve(),
		commonjs(),
		styles(),
		svgr(),
		image(),
		typescript({
			tsconfig: 'tsconfig.rollup.json',
			useTsconfigDeclarationDir: true
		})
	]
}
