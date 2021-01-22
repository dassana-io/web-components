import { action } from '@storybook/addon-actions'
import React from 'react'
import { Input, InputProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		classes: { control: 'array' },
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: Input,
	title: 'Input'
} as Meta

const Template: Story<InputProps> = args => <Input {...args} />

export const Default = Template.bind({})

export const Placeholder = Template.bind({})
Placeholder.args = { placeholder: 'Search...' }

export const Loading = Template.bind({})
Loading.args = { loading: true }

export const FullWidth = Template.bind({})
FullWidth.args = { fullWidth: true }

export const Error = Template.bind({})
Error.args = { error: true }

export const Disabled = Template.bind({})
Disabled.args = { disabled: true }

export const Addons = Template.bind({})
Addons.args = {
	addonAfter: '.com',
	addonBefore: '@',
	placeholder: 'yourdomain'
}
