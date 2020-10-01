import { useDarkMode } from 'storybook-dark-mode'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import './index.css'
import { themes } from '@storybook/theming'
import { StoryContext } from '@storybook/addons'
import { Story } from '@storybook/react/types-6-0'
import React from 'react'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	// controls: { expanded: true }, // uncomment to display controls with description and defaults
	viewport: {
		viewports: INITIAL_VIEWPORTS
	}
}

/*
TODO: Uninstall storybook-dark-mode and use sb's native theming with toolbar when it comes out.
Look at this comment for examples of various ways to implement: https://github.com/storybookjs/storybook/pull/12368#issuecomment-702339916
Also follow thread for updates.
*/
export const withThemeProvider = (
	ComponentStory: Story,
	context: StoryContext
) => {
	const themeClass = useDarkMode() ? 'dark' : ''

	return (
		<div className={themeClass}>
			<ComponentStory {...context} />
		</div>
	)
}

export const decorators = [withThemeProvider]
