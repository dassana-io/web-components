/* eslint-disable */
const { exec } = require('child_process')
const fs = require('fs')

if (fs.existsSync('globalApi')) {
	exec('npm run api-models:global')
}
