import { createUseStyles } from 'react-jss'
import { ColoredDot, ColoredDotProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { light, dark } = ThemeType

export default {
	argTypes: {
		classes: { control: { disable: true } }
	},
	component: ColoredDot,
	title: 'ColoredDot'
} as Meta

const {
	colors: { oranges, greens },
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

const Template: Story<ColoredDotProps> = args => <DecoratedStory {...args} />

export const Colored = Template.bind({})
Colored.args = {
	colors: { [dark]: oranges.base, [light]: greens.base },
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
