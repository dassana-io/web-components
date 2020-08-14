import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tag, { TagProps } from './index'

export default {
	children: { name: 'Tag Text' },
	component: Tag,
	title: 'Tag'
} as Meta

const Template: Story<TagProps> = args => <Tag {...args}>{args.children}</Tag>

export const Default = Template.bind({})
Default.args = {
	children: 'Default'
}

export const Colored = Template.bind({})
Colored.args = { children: 'Blue', color: 'blue' }
