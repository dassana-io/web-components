/* eslint-disable */
const fs = require('fs')
const npm = require('npm')

if (fs.existsSync('globalApi')) {
	npm.load(() => {
		npm.run('api-models:global')
	})
}
