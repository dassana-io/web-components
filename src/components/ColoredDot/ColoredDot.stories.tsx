import { SbTheme } from '../../../.storybook/preview'
import { ColoredDot, ColoredDotProps } from '.'
import { createUseStyles, useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { styleguide, themedStyles, ThemeType } from 'components/assets/styles'

const { light, dark } = ThemeType

export default {
	argTypes: {
		classes: { control: { disable: true } },
		popupContainerSelector: { control: { disable: true } }
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

	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<div className={classes.container}>
			<p>Hover over colored dot to show tooltip.</p>
			<ColoredDot
				{...props}
				classes={[classes.dot]}
				popupContainerSelector={popupContainerSelector}
			/>
		</div>
	)
}
