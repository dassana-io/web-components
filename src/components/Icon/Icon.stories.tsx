import React from 'react'
import Icon, { IconProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		height: { defaultValue: 64 }
	},
	component: Icon,
	title: 'Icon'
} as Meta

const Template: Story<IconProps> = args => <Icon {...args} />

export const Predefined = Template.bind({})
Predefined.argTypes = {
	icon: {
		control: { disable: true }
	}
}
Predefined.args = {
	iconKey: 'dassana'
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
