import { generateNotification } from './index'
import React from 'react'
import Button, { ButtonProps } from '../Button'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' }
	},
	title: 'Notifications'
} as Meta

const Template: Story<ButtonProps> = args => (
	<Button {...args}>{args.children}</Button>
)

export const Error = Template.bind({})
Error.args = {
	children: 'Error',
	onClick: () =>
		generateNotification('error', 'Message for error notification')
}

export const Info = Template.bind({})
Info.args = {
	children: 'Info',
	onClick: () => generateNotification('info', 'Message for info notification')
}

export const Success = Template.bind({})
Success.args = {
	children: 'Success',
	onClick: () =>
		generateNotification('success', 'Message for success notification')
}

export const Warning = Template.bind({})
Warning.args = {
	children: 'Warning',
	onClick: () =>
		generateNotification('warning', 'Message for warning notification')
}
