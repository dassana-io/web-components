import { createUseStyles } from 'react-jss'
import { ColoredDot, ColoredDotProps } from '.'
import { Meta, StoryFn } from '@storybook/react'
import React, { FC } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { light, dark } = ThemeType

export default {
	argTypes: {
		classes: { control: { disable: true } },
		color: { control: { type: 'color' } }
	},
	component: ColoredDot,
	title: 'ColoredDot'
} as Meta

const {
	colors: { greens },
	font,
	spacing
} = styleguide

const useStyles = createUseStyles({
	container: {
		...font.body,
		color: themedStyles[light].base.color,
		paddingLeft: spacing.l
	},
	dot: {
		margin: spacing.m
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				color: themedStyles[dark].base.color
			}
		}
	}
})

const Template: StoryFn<ColoredDotProps> = args => <DecoratedStory {...args} />

export const Colored = Template.bind({})
Colored.args = {
	color: greens.base,
	tooltipText: 'Colored Dot'
}

const DecoratedStory: FC<ColoredDotProps> = (props: ColoredDotProps) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<p>Hover over colored dot to show tooltip.</p>
			<ColoredDot {...props} classes={[classes.dot]} />
		</div>
	)
}
