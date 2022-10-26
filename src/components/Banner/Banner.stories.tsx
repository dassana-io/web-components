import { createUseStyles } from 'react-jss'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React from 'react'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'

const { error, info, success, warning } = NotificationTypes

const useStyles = createUseStyles({
	decorator: {
		'& > button': {
			marginTop: 20
		}
	}
})

export default {
	argTypes: {
		children: { control: { disable: true } },
		classes: { control: 'array' }
	},
	component: Banner,
	decorators: [SecondaryBgDecorator],
	title: 'Banner'
} as Meta

const DecoratedBannerStory = ({ ...rest }: BannerProps) => {
	const classes = useStyles()

	return (
		<div className={classes.decorator}>
			<Banner {...rest}>
				Once we receive an alert we scan it against policy risk rules.
				The rules are evaluated in order from top to bottom. The first
				rule that matches determines the risk of the alert. Updating a
				rule will not impact the past alerts. However you can use past
				alerts as a reference to edit rules such that future alerts get
				your desired risk classification.
			</Banner>
			<button
				onClick={() => {
					localStorage.setItem('bannerPref', '{}')
					window.location.reload()
				}}
			>
				Reset all banners
			</button>
		</div>
	)
}

const BannerTemplate: Story<BannerProps> = args => (
	<DecoratedBannerStory {...args} />
)

export const Error = BannerTemplate.bind({})
Error.args = {
	showIcon: true,
	title: 'Error',
	type: error
}

export const Info = BannerTemplate.bind({})
Info.args = {
	showIcon: true,
	title: 'Info',
	type: info
}

export const Success = BannerTemplate.bind({})
Success.args = {
	showIcon: true,
	title: 'Success',
	type: success
}

export const Warning = BannerTemplate.bind({})
Warning.args = {
	showIcon: true,
	title: 'Warning',
	type: warning
}

export const NoIcon = BannerTemplate.bind({})
NoIcon.args = {
	showIcon: false,
	title: 'Policy Risk Rules',
	type: success
}
