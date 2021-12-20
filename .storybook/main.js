module.exports = {
	stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-actions',
		'@storybook/preset-create-react-app',
		'@storybook/addon-cssresources'
	],
	core: {
		builder: 'webpack5'
	}
}
