import { Button } from '../Button'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
	NotificationProvider,
	NotificationTypes,
	useNotification
} from './index'

export default {
	argTypes: {
		children: { control: 'text' }
	},
	decorators: [
		Story => (
			<NotificationProvider>
				<Story />
			</NotificationProvider>
		)
	],
	title: 'Notification'
} as Meta

const Template: Story = args => {
	const { generateNotification } = useNotification()

	return (
		<Button
			onClick={() => {
				generateNotification({
					message: 'type',
					type: NotificationTypes.success
				})
			}}
		>
			Click
		</Button>
	)
}

export const Default = Template.bind({})
