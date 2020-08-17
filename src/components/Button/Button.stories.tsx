import { action } from '@storybook/addon-actions'
import React from 'react'
import Button, { ButtonProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' }
	},
	component: Button,
	title: 'Button'
} as Meta

const buttonProps: ButtonProps = {
	onClick: action('onClick')
}

const Template: Story<ButtonProps> = args => (
	<Button {...args}>{args.children}</Button>
)

export const Default = Template.bind({})
Default.args = { ...buttonProps, children: 'Default' }

export const Disabled = Template.bind({})
Disabled.args = { ...buttonProps, children: 'Disabled', disabled: true }

export const Primary = Template.bind({})
Primary.args = { ...buttonProps, children: 'Primary', primary: true }

export const Submit = Template.bind({})
Submit.args = { ...buttonProps, children: 'Submit', type: 'submit' }

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
	...buttonProps,
	children: 'Primary Disabled',
	disabled: true,
	primary: true
}

// Buttons with Icon
interface IconProps extends ButtonProps {
	icon?: string
}
const IconTemplate: Story<IconProps> = ({ icon, ...args }: IconProps) => (
	<Button {...args}>
		{icon && <i className={`${icon} icon`} />}
		{args.children}
	</Button>
)

export const Google = IconTemplate.bind({})
Google.args = {
	...buttonProps,
	children: 'Google',
	classes: ['google', 'plus'],
	icon: 'google'
}

export const Icon = IconTemplate.bind({})
Icon.args = {
	...buttonProps,
	children: 'Twitter',
	classes: ['twitter'],
	icon: 'twitter'
}
