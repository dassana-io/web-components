import './index.css'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import document from 'global/document'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import isChromatic from 'chromatic/isChromatic'
import { Story } from '@storybook/react/types-6-0'
import { StoryContext } from '@storybook/addons'
import { withCssResources } from '@storybook/addon-cssresources'
import {
	convert,
	createReset,
	Global,
	styled,
	Theme,
	ThemeProvider,
	themes,
	useTheme
} from '@storybook/theming'
import React, { FC, ReactNode, useEffect } from 'react'

const useStyles = createUseStyles({
	storyContainer: {
		display: 'flex'
	},
	storyWrapper: {
		padding: '1rem'
	}
})

const ThemeBlock = styled.div(
	{
		height: '100vh',
		left: 0,
		overflow: 'auto',
		right: '50vw',
		width: '50vw'
	},
	({ theme }) => ({
		background: theme.background.app,
		color: theme.color.defaultText
	}),
	// @ts-ignore
	({ side }) =>
		side === 'left'
			? {
					left: 0,
					right: '50vw'
			  }
			: {
					left: '50vw',
					right: 0
			  }
)

const ThemedSetRoot = () => {
	const theme: Theme = useTheme()

	useEffect(() => {
		document.body.style.background = theme.background.app
		document.body.style.color = theme.defaultText
	})

	return null
}

interface StoryWrapperProps {
	children: ReactNode
	dark?: boolean
}
/*
This wrapper does two things:
  1. Adds padding to the story since it was removed from .sb-show-main in ./index.css
  2. Toggles 'dark' theme class
*/
const StoryWrapper: FC<StoryWrapperProps> = ({
	children,
	dark = false
}: StoryWrapperProps) => {
	const classes = useStyles()
	const wrapperClasses = cn({
		dark,
		[classes.storyWrapper]: true
	})

	return <div className={wrapperClasses}>{children}</div>
}

const ThemeWrapper = (
	ComponentStory: Story,
	{ globals: { theme = 'light' } }: StoryContext
) => {
	const classes = useStyles()

	switch (theme) {
		case 'side-by-side': {
			return (
				<div className={classes.storyContainer}>
					<ThemeProvider theme={convert(themes.light)}>
						<Global styles={createReset} />
					</ThemeProvider>
					<ThemeProvider theme={convert(themes.light)}>
						{/* @ts-ignore */}
						<ThemeBlock side='left'>
							<StoryWrapper>{<ComponentStory />}</StoryWrapper>
						</ThemeBlock>
					</ThemeProvider>
					<ThemeProvider theme={convert(themes.dark)}>
						{/* @ts-ignore */}
						<ThemeBlock side='right'>
							<StoryWrapper dark={true}>
								{<ComponentStory />}
							</StoryWrapper>
						</ThemeBlock>
					</ThemeProvider>
				</div>
			)
		}

		default: {
			return (
				<ThemeProvider theme={convert(themes[theme])}>
					<Global styles={createReset} />
					<ThemedSetRoot />
					<StoryWrapper dark={theme === 'dark'}>
						{<ComponentStory />}
					</StoryWrapper>
				</ThemeProvider>
			)
		}
	}
}

export const globalTypes = {
	theme: {
		defaultValue: isChromatic() ? 'side-by-side' : 'light',
		description: 'Global theme for components',
		name: 'Theme',
		toolbar: {
			icon: 'circlehollow',
			items: [
				{ icon: 'circlehollow', title: 'light', value: 'light' },
				{ icon: 'circle', title: 'dark', value: 'dark' },
				{
					icon: 'sidebar',
					title: 'side by side',
					value: 'side-by-side'
				}
			]
		}
	},
	viewport: {
		viewports: INITIAL_VIEWPORTS
	}
}

export const decorators = [withCssResources, ThemeWrapper]
