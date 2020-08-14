import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	viewport: {
		viewports: INITIAL_VIEWPORTS
	},
	backgrounds: {
		default: 'dark',
		values: [
			{
				name: 'dark',
				value: '#212121'
			},
			{
				name: 'light',
				value: '#ffffff'
			}
		]
	}
}
