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
	children: 'Default',
	href: '',
	onClick: actionsData.onClick
}

export const Default: FC<LinkProps> = () => <Link {...LinkData} />

export const LinkWithKnobs: FC<LinkProps> = () => {
	const linkTargetOpts: Record<string, LinkTargetType> = {
		blank: '_blank',
		self: '_self'
	}

	const props: LinkProps = {
		...LinkData,
		children: text('Link text', 'Link'),
		target: select<LinkTargetType>('Target', linkTargetOpts, '_self')
	}

	return <Link {...props} />
}
