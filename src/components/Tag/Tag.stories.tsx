import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Tag, TagProps } from '.'

export default {
	argTypes: {
		children: { control: 'text' },
		color: {
			control: 'color'
		},
		onClose: { defaultValue: action('onClose') }
	},
	component: Tag,
	title: 'Tag'
} as Meta

const Template: Story<TagProps> = args => <Tag {...args}>{args.children}</Tag>

export const Default = Template.bind({})
Default.args = { children: 'Default' }

export const Colored = Template.bind({})
Colored.args = { children: 'Colored', color: '#108ee9' }
