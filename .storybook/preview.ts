import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import 'normalize.css'
import '../src/styles/index.css'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	// controls: { expanded: true }, // uncomment to display controls with description and defaults
	viewport: {
		viewports: INITIAL_VIEWPORTS
	},
	backgrounds: {
		default: 'light',
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
