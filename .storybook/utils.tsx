import { createUseStyles } from 'react-jss'
import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { styleguide, themes, ThemeType } from '../src/components/assets/styles'

const { spacing } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	decorator: {
		background: themes[light].background.secondary,
		height: `calc(100vh - ${spacing.m * 2}px)`,
		padding: spacing.l,
		width: '100%'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $decorator': {
				background: themes[dark].background.secondary
			}
		}
	}
})

export const SecondaryBgDecorator = (CompStory: Story) => {
	const classes = useStyles()

	return (
		<div className={classes.decorator}>
			<CompStory />
		</div>
	)
}
