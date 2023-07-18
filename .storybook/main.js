module.exports = {
	stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-actions',
		'@storybook/addon-mdx-gfm'
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	typescript: {
		reactDocgen: false
	},
	docs: {
		autodocs: true
	}
}
