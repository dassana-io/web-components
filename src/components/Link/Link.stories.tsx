import { action } from '@storybook/addon-actions'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import Link, { LinkProps, LinkTargetType, LinkType } from './index'
import React, { FC } from 'react'

export default {
	component: Link,
	decorators: [withKnobs],
	excludeStories: /.*Data$/,
	title: 'Link'
}

const actionsData = {
	onClick: action('onClick')
}

export const LinkData: LinkProps = {
	onClick: actionsData.onClick,
	url: ''
}

export const Default: FC<LinkProps> = () => <Link {...LinkData}>Default</Link>

export const Underlined: FC<LinkProps> = () => {
	const props: LinkProps = { ...LinkData, underline: true }
	return <Link {...props}>Blue</Link>
}

export const Warning: FC<LinkProps> = () => {
	const props: LinkProps = { ...LinkData, type: 'warning' }
	return <Link {...props}>Blue</Link>
}

export const LinkWithKnobs: FC<LinkProps> = () => {
	const typeOpts: Record<string, LinkType> = {
		danger: 'danger',
		secondary: 'secondary',
		warning: 'warning'
	}

	const linkTargetOpts: Record<string, LinkTargetType> = {
		blank: '_blank',
		parent: '_parent',
		self: '_self',
		top: '_top'
	}

	const props: LinkProps = {
		...LinkData,
		target: select<LinkTargetType>('Target', linkTargetOpts, '_blank'),
		type: select<LinkType>('Type', typeOpts, 'danger'),
		underline: boolean('Underline', true)
	}

	return <Link {...props}>{text('Link text', 'Link')}</Link>
}
