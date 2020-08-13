import { action } from '@storybook/addon-actions'
import Link, { LinkProps, LinkTargetType } from './index'
import React, { FC } from 'react'
import { select, text, withKnobs } from '@storybook/addon-knobs'

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
	href: '',
	onClick: actionsData.onClick
}

export const Default: FC<LinkProps> = () => <Link {...LinkData}>Default</Link>

export const LinkWithKnobs: FC<LinkProps> = () => {
	const linkTargetOpts: Record<string, LinkTargetType> = {
		parent: '_parent',
		self: '_self'
	}

	const props: LinkProps = {
		...LinkData,
		target: select<LinkTargetType>('Target', linkTargetOpts, '_blank')
	}

	return <Link {...props}>{text('Link text', 'Link')}</Link>
}
