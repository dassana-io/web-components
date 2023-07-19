import { action } from '@storybook/addon-actions'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import { Tag, type TagProps } from '.'

export default {
	argTypes: {
		children: { control: 'text' },
		color: {
			control: 'color'
		},
		onDelete: { defaultValue: action('onDelete') }
	},
	component: Tag,
	title: 'Tag'
} as Meta

const Template: Story<TagProps> = args => <Tag {...args}>{args.children}</Tag>

export const Default = Template.bind({})
Default.args = { children: 'Default' }

export const Colored = Template.bind({})
Colored.args = { children: 'Colored', color: '#108ee9' }
