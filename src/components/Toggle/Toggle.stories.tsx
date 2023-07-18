import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Toggle, ToggleProps } from '.'

export default {
	argTypes: {
		classes: { control: 'array' },
		onChange: { defaultValue: action('onChange') }
	},
	component: Toggle,
	title: 'Toggle'
} as Meta

const Template: Story<ToggleProps> = args => <Toggle {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true
}

export const Small = Template.bind({})
Small.args = {
	size: 'small'
}
