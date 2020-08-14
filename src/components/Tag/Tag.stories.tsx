<<<<<<< HEAD
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tag, { TagProps } from './index'

export default {
	argTypes: {
		children: { control: 'text' },
		color: {
			control: 'color'
		}
	},
	component: Tag,
	title: 'Tag'
} as Meta

const Template: Story<TagProps> = args => <Tag {...args}>{args.children}</Tag>

export const Default = Template.bind({})
Default.args = { children: 'Default' }

export const Colored = Template.bind({})
Colored.args = { children: 'Colored', color: '#108ee9' }

export const ColoredPreset = Template.bind({})
ColoredPreset.args = { children: 'Blue', color: 'blue' }
ColoredPreset.argTypes = {
	color: {
		control: {
			options: [
				'magenta',
				'red',
				'volcano',
				'orange',
				'gold',
				'lime',
				'green',
				'cyan',
				'blue',
				'geekblue',
				'purple'
			],
			type: 'select'
		}
	}
=======
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
	const props: TagProps = { children: 'Blue', color: 'blue' }
	return <Tag {...props} />
}

export const TagWithKnobs: FC<TagProps> = () => {
	const props: TagProps = {
		children: text('Tag text', 'Magenta'),
		color: text('color', 'magenta')
	}
	return <Tag {...props} />
>>>>>>> Feat #43 - Tag, Link components
}
