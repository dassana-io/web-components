import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import path from 'path'
import pkg from './package.json' assert { type: 'json' }
import resolve from '@rollup/plugin-node-resolve'
import styles from 'rollup-plugin-styles'
import svgr from '@svgr/rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

import { fileURLToPath } from 'url'

const assetFileNames = '[name]-[hash][extname]'

/* 
handle absolute imports
https://github.com/rollup/rollup/issues/558#issuecomment-353797769
*/
const rootImport = options => ({
	resolveId: importee => {
		if (importee[0] === '/') {
			const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
			const __dirname = path.dirname(__filename) // get the name of the directory
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
		'@dnd-kit/core',
		'@dnd-kit/modifiers',
		'@dnd-kit/sortable',
		'@fortawesome/fontawesome-svg-core',
		'@fortawesome/free-solid-svg-icons',
		'@fortawesome/pro-light-svg-icons',
		'@fortawesome/pro-regular-svg-icons',
		'@fortawesome/react-fontawesome',
		'ace-builds',
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
		'react-ace',
		'react-dom',
		'react-helmet',
		'react-hook-form',
		'react-jss',
		'react-scroll',
		'remark-gfm',
		'react-markdown',
		'rehype-external-links',
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
		json(),
		svgr(),
		image(),
		typescript({
			include: ['src/components/**/*', 'src/custom.d.ts'],
			exclude: [
				'**/__tests__',
				'**/fixtures',
				'*.stories.tsx',
				'.storybook'
			]
		}),
		terser()
	]
}
