import React, { FC } from 'react'
import Tag, { TagProps } from './index'
import { text, withKnobs } from '@storybook/addon-knobs'

export default {
	component: Tag,
	decorators: [withKnobs],
	excludeStories: /.*Data$/,
	title: 'Tag'
}

export const Default: FC<TagProps> = () => <Tag>Default</Tag>

export const Colored: FC<TagProps> = () => {
	const props: TagProps = { color: 'blue' }
	return <Tag {...props}>Blue</Tag>
}

export const TagWithKnobs: FC<TagProps> = () => {
	const props: TagProps = { color: text('color', 'magenta') }
	return <Tag {...props}>{text('Tag text', 'Magenta')}</Tag>
}
