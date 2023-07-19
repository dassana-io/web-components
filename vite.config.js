import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => {
	return {
		build: {
			outDir: 'build'
		},
		plugins: [svgr(), react(), eslint()],
		resolve: {
			alias: {
				assets: path.resolve('src/assets/'),
				components: path.resolve('src/components/'),
				__mocks__: path.resolve('src/__mocks__/')
			}
		}
	}
})
