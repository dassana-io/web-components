import React from 'react'
import { Icon, type IconProps } from '.'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
	argTypes: {
		height: { defaultValue: 64 }
	},
	component: Icon,
	title: 'Icon'
} as Meta

const Template: StoryFn<IconProps> = (args: IconProps) => <Icon {...args} />

export const Predefined = Template.bind({})
Predefined.argTypes = {
	color: { control: { type: 'color' } },
	icon: {
		control: { disable: true }
	}
}
Predefined.args = {
	iconKey: 'aws'
}

export const Custom = Template.bind({})
Custom.argTypes = {
	iconKey: {
		control: { disable: true }
	}
}
Custom.args = {
	icon: 'https://dummyimage.com/600x400/000/fff&text=Dassana'
}
