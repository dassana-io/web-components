import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs'
import image from '@rollup/plugin-image'
import path from 'path'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const assetFileNames = '[name]-[hash][extname]'

/* 
handle absolute imports
https://github.com/rollup/rollup/issues/558#issuecomment-353797769
*/
const rootImport = options => ({
	resolveId: importee => {
		if (importee[0] === '/') {
			const rootPath = `${options.root}${importee}.*`
			const absPath = path.resolve(__dirname, rootPath)

			return fs.existsSync(absPath) ? absPath : null
		}

		return null
	}
})

export default {
	external: [
		'@ant-design/icons',
		'@dassana-io/web-utils',
		'@fortawesome/fontawesome-svg-core',
		'@fortawesome/free-solid-svg-icons',
		'@fortawesome/pro-light-svg-icons',
		'@fortawesome/pro-regular-svg-icons',
		'@fortawesome/react-fontawesome',
		'antd',
		'bytes',
		'classnames',
		'color',
		'framer-motion',
		'fuse.js',
		'jsonpath-plus',
		'lodash',
		'mark.js',
		'moment',
		'npm',
		'prettier',
		'prismjs',
		'react',
		'react-dom',
		'react-helmet',
		'react-hook-form',
		'react-jss',
		'react-scroll',
		'remark-gfm',
		'react-markdown',
		'typescript',
		'uuid'
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
			tsconfig: 'tsconfig.rollup.json',
			useTsconfigDeclarationDir: true
		}),
		terser()
	]
}
