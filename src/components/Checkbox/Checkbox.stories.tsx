import React from 'react'
import { Checkbox, type CheckboxProps } from './index'
import { type Meta, type Story } from '@storybook/react'

export default {
	argTypes: {
		checked: { control: { disable: true } },
		label: { control: 'text' }
	},
	component: Checkbox,
	title: 'Checkbox'
} as Meta

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />

export const Default = Template.bind({})

export const DefaultChecked = Template.bind({})
DefaultChecked.args = {
	defaultChecked: true
}

export const Label = Template.bind({})
Label.args = {
	label: 'Checkbox'
}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
	defaultChecked: true,
	disabled: true
}
