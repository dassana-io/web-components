import { createUseStyles } from 'react-jss'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

const { error, info, success, warning } = NotificationTypes

const useStyles = createUseStyles({
	decorator: {
		textAlign: 'center'
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

const DecoratedBannerStory = (props: BannerProps) => {
	const classes = useStyles()

	const banners = localStorage.getItem('bannerPref')
		? JSON.parse(localStorage.getItem('bannerPref')!)
		: {}

	const [renderBanner, setRenderBanner] = useState<boolean>(
		banners[props.id] === undefined || banners[props.id] === true
	)

	const onBannerClose = () => setRenderBanner(false)

	// Closed banner is only display for stories
	return renderBanner ? (
		<div onClick={onBannerClose}>
			<Banner {...props}>
				Once we receive an alert we scan it against policy risk rules.
				The rules are evaluated in order from top to bottom. The first
				rule that matches determines the risk of the alert. Updating a
				rule will not impact the past alerts. However you can use past
				alerts as a reference to edit rules such that future alerts get
				your desired risk classification.
			</Banner>
		</div>
	) : (
		<div className={classes.decorator}>
			Closed banner-id: {`${props.id}`}
		</div>
	)
}

const BannerTemplate: Story<BannerProps> = args => (
	<DecoratedBannerStory {...args} />
)

export const Error = BannerTemplate.bind({})
Error.args = {
	id: 'sb-error-banner',
	showIcon: true,
	title: 'Error',
	type: error
}

export const Info = BannerTemplate.bind({})
Info.args = {
	id: 'sb-info-banner',
	showIcon: true,
	title: 'Info',
	type: info
}

export const Success = BannerTemplate.bind({})
Success.args = {
	id: 'sb-success-banner',
	showIcon: true,
	title: 'Success',
	type: success
}

export const Warning = BannerTemplate.bind({})
Warning.args = {
	id: 'sb-warning-banner',
	showIcon: true,
	title: 'Warning',
	type: warning
}

export const NoIcon = BannerTemplate.bind({})
NoIcon.args = {
	id: 'sb-no-icon-banner',
	showIcon: false,
	title: 'Policy Risk Rules',
	type: success
}
