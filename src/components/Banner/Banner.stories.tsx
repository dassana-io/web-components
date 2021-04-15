import { Button } from 'components/Button'
import { createUseStyles } from 'react-jss'
import { ev as NotificationTypes } from '@dassana-io/web-utils'
import React from 'react'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { styleguide } from 'components/assets/styles'
import { Banner, BannerProps } from '.'
import { Meta, Story } from '@storybook/react'

const { error, info, success, warning } = NotificationTypes

const { spacing } = styleguide

const useStyles = createUseStyles({
	button: {
		marginTop: spacing.m
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

const DecoratedBannerStory = ({ id, ...rest }: BannerProps) => {
	const classes = useStyles()
	return (
		<>
			<Banner {...rest} id={id}>
				Once we receive an alert we scan it against policy risk rules.
				The rules are evaluated in order from top to bottom. The first
				rule that matches determines the risk of the alert. Updating a
				rule will not impact the past alerts. However you can use past
				alerts as a reference to edit rules such that future alerts get
				your desired risk classification.
			</Banner>

			<Button
				classes={[classes.button]}
				onClick={() => {
					localStorage.setItem('bannerPref', JSON.stringify({}))

					window.location.reload()
				}}
			>
				Reset all banner preferences
			</Button>
		</>
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
