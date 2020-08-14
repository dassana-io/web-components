import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tag, { TagProps } from './index'

export default {
	argTypes: {
		color: {
			control: 'color'
		}
	},
	children: { name: 'Tag Text' },
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
}
