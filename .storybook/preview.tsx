import './index.css'
import cn from 'classnames'
import document from 'global/document'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import isChromatic from 'chromatic/isChromatic'
import { Story } from '@storybook/react/types-6-0'
import { StoryContext } from '@storybook/addons'
import {
	themes,
	Theme,
	ThemesType
} from '../src/components/assets/styles/themes'
import { createUseStyles, ThemeProvider, useTheme } from 'react-jss'
import { withCssResources } from '@storybook/addon-cssresources'
import React, { FC, ReactNode, useEffect } from 'react'

const { dark, light } = ThemesType

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
		background: ({ theme }: { theme: Theme }) => theme.background,
		height: '100vh',
		left: props => (props.side === 'left' ? 0 : '50vw'),
		overflow: 'auto',
		right: props => (props.side === 'right' ? '50vw' : 0),
		width: '50vw'
	}
})

const ThemedCanvasBg = () => {
	const theme: Theme = useTheme()

	useEffect(() => {
		document.body.style.background = theme.background
	})

	return null
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

interface StoryWrapperProps {
	children: ReactNode
	dark?: boolean
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
			<StoryWrapper dark={side === 'left' ? false : true}>
				{children}
			</StoryWrapper>
		</div>
	)
}

interface ThemedBlockProps {
	children: ReactNode
	side: 'left' | 'right'
}

/* This is the decorator that wraps the stories with a theme provider and a wrapper div for side-by-side view. */
const ThemeDecorator = (
	ComponentStory: Story,
	{ globals: { theme = light } }: StoryContext
) => {
	const classes = useStyles()

	switch (theme) {
		case 'side-by-side': {
			return (
				<div className={classes.storyContainer}>
					<ThemeProvider theme={themes[light]}>
						<ThemedBlock side='left'>
							<ComponentStory />
						</ThemedBlock>
					</ThemeProvider>
					<ThemeProvider theme={themes[dark]}>
						<ThemedBlock side='right'>
							<ComponentStory />
						</ThemedBlock>
					</ThemeProvider>
				</div>
			)
		}

		default: {
			return (
				<ThemeProvider theme={themes[theme]}>
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
		defaultValue: isChromatic() ? 'side-by-side' : light,
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
					value: 'side-by-side'
				}
			]
		}
	},
	viewport: {
		viewports: INITIAL_VIEWPORTS
	}
}

export const decorators = [withCssResources, ThemeDecorator]
