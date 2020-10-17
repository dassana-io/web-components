import { action } from '@storybook/addon-actions'
import React from 'react'
import { Button, ButtonProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' },
		onClick: { defaultValue: action('onClick') }
	},
	component: Button,
	title: 'Button'
} as Meta

const Template: Story<ButtonProps> = args => (
	<Button {...args}>{args.children}</Button>
)

export const Default = Template.bind({})
Default.args = { children: 'Default' }

export const Disabled = Template.bind({})
Disabled.args = { children: 'Disabled', disabled: true }

export const Loading = Template.bind({})
Loading.args = { children: 'Loading', loading: true }

export const Pending = Template.bind({})
Pending.args = { children: 'Pending', pending: true }

export const Primary = Template.bind({})
Primary.args = { children: 'Primary', primary: true }

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
	children: 'Primary Disabled',
	disabled: true,
	primary: true
}
