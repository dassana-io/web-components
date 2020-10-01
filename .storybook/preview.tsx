import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import './index.css'
// import { StoryContext } from '@storybook/addons'
// import { Story } from '@storybook/react/types-6-0'
// import React from 'react'
import { themes } from '@storybook/theming'
// import { useDarkMode } from 'storybook-dark-mode'
// import { addParameters } from '@storybook/react'

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
	},
	darkMode: {
		current: 'light',
		dark: { ...themes.dark },
		light: { ...themes.normal },
		darkClass: 'dark',
		lightClass: 'light',
		stylePreview: true
	}
}

// export const withThemeProvider = (
// 	ComponentStory: Story,
// 	context: StoryContext
// ) => {
// 	console.log(context)
// 	console.log(useDarkMode())
// 	const themeClass = useDarkMode() ? 'dark' : ''

// 	return (
// 		<div className={themeClass} style={{ height: '100%', width: '100%' }}>
// 			<ComponentStory {...context} />
// 		</div>
// 	)
// }

// export const globalTypes = {
// 	theme: {
// 		name: 'Theme',
// 		description: 'Global theme for components',
// 		defaultValue: 'light',
// 		toolbar: {
// 			items: [
// 				{ value: 'light', title: 'light', icon: 'circlehollow' },
// 				{ value: 'dark', title: 'dark', icon: 'circle' }
// 			]
// 		}
// 	}
// }

// export const decorators = [withThemeProvider]
