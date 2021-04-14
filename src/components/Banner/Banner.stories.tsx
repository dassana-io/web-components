import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React from 'react'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'

const { error, info, success, warning } = NotificationTypes

export default {
	argTypes: {
		children: { control: { disable: true } },
		classes: { control: 'array' }
	},
	component: Banner,
	decorators: [SecondaryBgDecorator],
	title: 'Banner'
} as Meta

const Template: Story<BannerProps> = args => (
	<Banner {...args}>
		Once we receive an alert we scan it against policy risk rules. The rules
		are evaluated in order from top to bottom. The first rule that matches
		determines the risk of the alert. Updating a rule will not impact the
		past alerts. However you can use past alerts as a reference to edit
		rules such that future alerts get your desired risk classification.
	</Banner>
)

export const Error = Template.bind({})
Error.args = {
	id: 1,
	showIcon: true,
	title: 'Error',
	type: error
}

export const Info = Template.bind({})
Info.args = {
	id: 2,
	showIcon: true,
	title: 'Info',
	type: info
}

export const Success = Template.bind({})
Success.args = {
	id: 3,
	showIcon: true,
	title: 'Success',
	type: success
}

export const Warning = Template.bind({})
Warning.args = {
	id: 4,
	showIcon: true,
	title: 'Warning',
	type: warning
}

export const NoIcon = Template.bind({})
NoIcon.args = {
	id: 5,
	showIcon: false,
	title: 'Policy Risk Rules',
	type: success
}
