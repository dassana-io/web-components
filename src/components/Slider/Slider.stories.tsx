import { action } from '@storybook/addon-actions'
import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'
import { Slider, type SliderProps } from '.'

export default {
	argTypes: {
		classes: { control: 'object' },
		onAfterChange: {
			defaultValue: action('onAfterChange')
		}
	},
	component: Slider,
	title: 'Slider'
} as Meta

const Template: StoryFn<SliderProps> = args => (
	<Slider {...args} showMinMax showTooltipOnHover />
)

export const Default = Template.bind({})
