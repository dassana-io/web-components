import { Button } from '../Button'
import { generatePopupSelector } from '../utils'
import React from 'react'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
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
		Story => {
			const theme: SbTheme = useTheme()

			return (
				<NotificationProvider
					getPopupContainer={generatePopupSelector(`.${theme.type}`)}
				>
					<Story />
				</NotificationProvider>
			)
		}
	],
	title: 'Notification'
} as Meta

const Template: Story = () => {
	const { generateNotification } = useNotification()

	return (
		<Button
			onClick={() => {
				generateNotification({
					message: 'Notification Message',
					type: NotificationTypes.success
				})
			}}
		>
			Click
		</Button>
	)
}

export const Default = Template.bind({})
