import { Button } from '../Button'
import { generatePopupSelector } from '../utils'
import omit from 'lodash/omit'
import React from 'react'
import { type SbTheme } from '../../../.storybook/preview'
import startCase from 'lodash/startCase'
import { useTheme } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import {
	type NotificationConfig,
	NotificationProvider,
	NotificationTypes,
	useNotification
} from './index'

const { error, info, success, warning } = NotificationTypes

export default {
	argTypes: {
		duration: {
			control: { max: 10000, min: 1000, step: 500, type: 'range' },
			defaultValue: 3000,
			description:
				'Optional time in milliseconds before the Notification disappears'
		},
		message: { description: 'Notification message to display' },
		standalone: {
			control: { type: 'boolean' }
		},
		type: {
			control: {
				options: [error, info, success, warning],
				type: 'select'
			},
			description:
				'Notification type which can either be error, info, success or warning. Each type renders a different icon'
		}
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

const Template: StoryFn<NotificationConfig> = args => {
	const { generateNotification } = useNotification()

	return (
		<Button
			{...args}
			onClick={() => generateNotification(omit(args, 'children'))}
		>
			{startCase(args.type)}
		</Button>
	)
}

export const Error = Template.bind({})
Error.args = {
	message: 'Message for error notification',
	type: error
}

export const Info = Template.bind({})
Info.args = {
	message: 'Message for info notification',
	type: info
}

export const Success = Template.bind({})
Success.args = {
	message: 'Message for success notification',
	type: success
}

export const Warning = Template.bind({})
Warning.args = {
	message: 'Message for warning notification',
	type: warning
}
