// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
// import './index.css'
import { StoryContext } from '@storybook/addons'
import { Story } from '@storybook/react/types-6-0'
// import React from 'react'

// export const parameters = {
// 	actions: { argTypesRegex: '^on.*' }
// }

// export const globalTypes = {
// 	viewport: {
// 		viewports: INITIAL_VIEWPORTS
// 	},
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

// export const withThemeProvider = (
// 	ComponentStory: Story,
// 	context: StoryContext
// ) => {
// 	return (
// 		<div className={context.globals.theme}>
// 			<ComponentStory {...context} />
// 		</div>
// 	)
// }

// export const decorators = [withThemeProvider]

// import { document } from 'global'
var document = require('global/document')

import isChromatic from 'chromatic/isChromatic'
import React, { useEffect } from 'react'
import {
	Global,
	ThemeProvider,
	themes,
	createReset,
	convert,
	useTheme,
	Theme
} from '@storybook/theming'
import { withCssResources } from '@storybook/addon-cssresources'
import { DocsPage } from '@storybook/addon-docs/blocks'

const ThemedSetRoot = () => {
	const theme: Theme = useTheme()

	useEffect(() => {
		document.body.style.background = theme.background.app
		document.body.style.color = theme.defaultText

		theme.base === 'dark'
			? document.body.classList.add('dark')
			: document.body.classList.remove('dark')

		return () => {
			//
		}
	})

	return null
}

export const decorators = [
	withCssResources,
	(ComponentStory: Story, { globals: { theme = 'light' } }: StoryContext) => {
		switch (theme) {
			default: {
				return (
					<ThemeProvider theme={convert(themes[theme])}>
						<Global styles={createReset} />
						<ThemedSetRoot />
						<ComponentStory />
					</ThemeProvider>
				)
			}
		}
	}
]

export const parameters = {
	exportedParameter: 'exportedParameter',
	a11y: {
		config: {},
		options: {
			checks: { 'color-contrast': { options: { noScroll: true } } },
			restoreScroll: true
		}
	},
	options: {
		storySort: (a: any, b: any) =>
			a[1].kind === b[1].kind
				? 0
				: a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
	},
	docs: {
		theme: themes.light,
		page: () => <DocsPage />
	}
}

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: isChromatic() ? 'stacked' : 'light',
		toolbar: {
			icon: 'circlehollow',
			items: [
				{ value: 'light', icon: 'circlehollow', title: 'light' },
				{ value: 'dark', icon: 'circle', title: 'dark' }
			]
		}
	}
}
