import { Button } from '../Button'
import React from 'react'
import { SbTheme } from '../../../.storybook/preview'
import { ThemeType } from 'components/assets/styles/themes'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
	NotificationProvider,
	NotificationTypes,
	useNotification
} from './index'

const { dark, light } = ThemeType

export default {
	argTypes: {
		children: { control: 'text' }
	},
	decorators: [
		Story => {
			const theme: SbTheme = useTheme()

			return (
				<NotificationProvider
					getPopupContainer={() =>
						document.querySelector(
							theme.type === dark ? `.${dark}` : `.${light}`
						) as HTMLElement
					}
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
