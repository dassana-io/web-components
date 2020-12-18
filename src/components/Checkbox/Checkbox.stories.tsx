import React from 'react'
import { Checkbox, CheckboxProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

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
