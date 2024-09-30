import commonjs from '@rollup/plugin-commonjs'
import { fileURLToPath } from 'url'
import fs from 'fs'
import image from '@rollup/plugin-image'
import path from 'path'
import pkg from './package.json' assert { type: 'json' }
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import svgr from '@svgr/rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const assetFileNames = '[name]-[hash][extname]'

/* 
handle absolute imports
https://github.com/rollup/rollup/issues/558#issuecomment-353797769
*/
const rootImport = options => ({
	resolveId: importee => {
		if (importee[0] === '/') {
			const __filename = fileURLToPath(import.meta.url)
			const __dirname = path.dirname(__filename)

			const rootPath = `${options.root}${importee}.*`
			const absPath = path.resolve(__dirname, rootPath)

			return fs.existsSync(absPath) ? absPath : null
		}

		return null
	}
})

export default {
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.optionalDependencies),
		...Object.keys(pkg.peerDependencies)
	],
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
	plugins: [
		rootImport({
			root: './src'
		}),
		resolve(),
		commonjs(),
		styles(),
		svgr(),
		image(),
		typescript({
			include: ['src/components/**/*', 'src/custom.d.ts'],
			exclude: [
				'src/components/**/*.stories.tsx',
				'src/components/**/*.test.tsx',
				'src/components/**/*fixtures'
			]
		}),
		terser()
	]
}
