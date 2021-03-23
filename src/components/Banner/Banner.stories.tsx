import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React from 'react'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' }
	},
	component: Banner,
	title: 'Banner'
} as Meta

const Template: Story<BannerProps> = args => <Banner {...args} />

export const Error = Template.bind({})
Error.args = {
	children:
		'Once we receive an alert we scan it against policy risk rules. The rules are evaluated in order from top to bottom. The first rule that matches determines the risk of the alert. Updating a rule will not impact the past alerts. However you can use past alerts as a reference to edit rules such that future alerts get your desired risk classification.',
	title: 'Error',
	type: NotificationTypes.error
}

export const Info = Template.bind({})
Info.args = {
	children:
		'Once we receive an alert we scan it against policy risk rules. The rules are evaluated in order from top to bottom. The first rule that matches determines the risk of the alert. Updating a rule will not impact the past alerts. However you can use past alerts as a reference to edit rules such that future alerts get your desired risk classification.',
	title: 'Info',
	type: NotificationTypes.info
}

export const Success = Template.bind({})
Success.args = {
	children:
		'Once we receive an alert we scan it against policy risk rules. The rules are evaluated in order from top to bottom. The first rule that matches determines the risk of the alert. Updating a rule will not impact the past alerts. However you can use past alerts as a reference to edit rules such that future alerts get your desired risk classification.',
	title: 'Success',
	type: NotificationTypes.success
}

export const Warning = Template.bind({})
Warning.args = {
	children:
		'Once we receive an alert we scan it against policy risk rules. The rules are evaluated in order from top to bottom. The first rule that matches determines the risk of the alert. Updating a rule will not impact the past alerts. However you can use past alerts as a reference to edit rules such that future alerts get your desired risk classification.',
	title: 'Warning',
	type: NotificationTypes.warning
}

export const NoIcon = Template.bind({})
NoIcon.args = {
	children:
		'Once we receive an alert we scan it against policy risk rules. The rules are evaluated in order from top to bottom. The first rule that matches determines the risk of the alert. Updating a rule will not impact the past alerts. However you can use past alerts as a reference to edit rules such that future alerts get your desired risk classification.',
	showIcon: false,
	title: 'No Icon',
	type: NotificationTypes.success
}
