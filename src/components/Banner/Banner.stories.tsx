import React from 'react'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'
import { createUseStyles } from 'react-jss'
import { ev as NotificationTypes } from '@dassana-io/web-utils'

const useStyles = createUseStyles({
	test: {
		backgroundColor: 'red'
	}
})

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' }
	},
	component: Banner,
	title: 'Banner'
} as Meta

const Template: Story<BannerProps> = args => <Banner {...args} />

export const Test = Template.bind({})
Test.args = {
	children: 'this is a long ass message',
	title: 'hello',
	type: NotificationTypes.info
}

export const Error = Template.bind({})
Error.args = {
	children: 'This is an alert for information',
	title: 'Information',
	type: NotificationTypes.error
}

export const Info = Template.bind({})
Info.args = {
	children: 'This is an alert for information',
	title: 'Information',
	type: NotificationTypes.info
}

export const Success = Template.bind({})
Success.args = {
	children: 'This is an alert for information',
	title: 'Information',
	type: NotificationTypes.success
}

export const Warning = Template.bind({})
Warning.args = {
	children: 'This is an alert for information',
	title: 'Information',
	type: NotificationTypes.warning
}

export const NoIcon = Template.bind({})
NoIcon.args = {
	children: 'This is an alert for information',
	showIcon: false,
	title: 'Information',
	type: NotificationTypes.success
}
