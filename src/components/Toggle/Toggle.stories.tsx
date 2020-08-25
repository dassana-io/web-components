import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Toggle, { ToggleProps } from '.'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') }
	},
	component: Toggle,
	title: 'Toggle'
} as Meta

const Template: Story<ToggleProps> = args => <Toggle {...args} />

export const Default = Template.bind({})

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
	defaultChecked: true,
	disabled: true
}

export const CheckedSmall = Template.bind({})
CheckedSmall.args = {
	defaultChecked: true,
	size: 'small'
}
