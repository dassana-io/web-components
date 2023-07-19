import { action } from '@storybook/addon-actions'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import { Slider, type SliderProps } from '.'

export default {
	argTypes: {
		classes: { control: 'array' },
		onAfterChange: {
			defaultValue: action('onAfterChange')
		}
	},
	component: Slider,
	title: 'Slider'
} as Meta

const Template: Story<SliderProps> = args => <Slider {...args} />

export const Default = Template.bind({})
