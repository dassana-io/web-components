import './index.css'
import cn from 'classnames'
// import document from 'global/document'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import isChromatic from 'chromatic/isChromatic'
import { StoryFn } from '@storybook/react'
// import { StoryContext } from '@storybook/addons'
import {
	themes,
	Theme,
	ThemeType
} from '../src/components/assets/styles/themes'
import { createUseStyles, ThemeProvider, useTheme } from 'react-jss'
// import { withCssResources } from '@storybook/addon-cssresources'
import React, { FC, ReactNode, useEffect } from 'react'

enum LayoutTypes {
	sideBySide = 'side-by-side',
	left = 'left',
	right = 'right'
}

const { sideBySide, left, right } = LayoutTypes

const { dark, light } = ThemeType

// Storybook theme needs an extra "type" property to conditionally render a dark or light themed story for Popover and Tooltip components.
export interface SbTheme extends Theme {
	type: ThemeType.dark | ThemeType.light
}

const sbThemes = {
	[dark]: { ...themes[dark], type: dark },
	[light]: { ...themes[light], type: light }
}

const useStyles = createUseStyles({
	storyContainer: {
		display: 'flex'
	},
	storyWrapper: {
		padding: '1rem'
	}
})

const useStylesWithTheme = createUseStyles({
	themeBlock: {
		background: ({ theme }: { theme: Theme }) => theme.background.primary,
		height: '100vh',
		left: props => (props.side === left ? 0 : '50vw'),
		overflow: 'auto',
		right: props => (props.side === right ? '50vw' : 0),
		width: '50vw'
	}
})

const ThemedCanvasBg = () => {
	const theme: Theme = useTheme()

	useEffect(() => {
		document.body.style.background = theme.background.primary
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
		light: !dark,
		[classes.storyWrapper]: true
	})

	return <div className={wrapperClasses}>{children}</div>
}

interface ThemedBlockProps {
	children: ReactNode
	side: LayoutTypes.left | LayoutTypes.right
}
/* This adds a wrapper to style the left and right blocks for side-by-side viewing of dark and light themes. */
const ThemedBlock: FC<ThemedBlockProps> = ({
	children,
	...props
}: ThemedBlockProps) => {
	const theme = useTheme()
	const classes = useStylesWithTheme({ ...props, theme })
	const { side } = props

	return (
		<div className={classes.themeBlock}>
			<StoryWrapper dark={side === right}>{children}</StoryWrapper>
		</div>
	)
}

/* This is the decorator that wraps the stories with a theme provider and a wrapper div for side-by-side view. */
const ThemeDecorator = (
	ComponentStory: StoryFn,
	{ globals: { theme = light } }: any
) => {
	const classes = useStyles()

	switch (theme) {
		case sideBySide: {
			return (
				<div className={classes.storyContainer}>
					<ThemeProvider theme={sbThemes[light]}>
						<ThemedBlock side={left}>
							<ComponentStory />
						</ThemedBlock>
					</ThemeProvider>
					<ThemeProvider theme={sbThemes[dark]}>
						<ThemedBlock side={right}>
							<ComponentStory />
						</ThemedBlock>
					</ThemeProvider>
				</div>
			)
		}

		default: {
			return (
				<ThemeProvider theme={sbThemes[theme as ThemeType]}>
					<ThemedCanvasBg />
					<StoryWrapper dark={theme === dark}>
						<ComponentStory />
					</StoryWrapper>
				</ThemeProvider>
			)
		}
	}
}

export const globalTypes = {
	theme: {
		/* Setting side-by-side as default for chromatic allows for visual regression testing on both dark and light themed stories. */
		defaultValue: isChromatic() ? sideBySide : light,
		description: 'Global theme for components',
		name: 'Theme',
		toolbar: {
			icon: 'circlehollow',
			items: [
				{ icon: 'circlehollow', title: light, value: light },
				{ icon: 'circle', title: dark, value: dark },
				{
					icon: 'sidebar',
					title: 'side by side',
					value: sideBySide
				}
			]
		}
	},
	viewport: {
		viewports: INITIAL_VIEWPORTS
	}
}

export const decorators = [ThemeDecorator]
