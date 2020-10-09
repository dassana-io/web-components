import DassanaIcon from '../Icon'
import React from 'react'
import Avatar, { AvatarProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

const sizeOptions: Omit<AvatarProps['size'], number>[] = [
	'default',
	'large',
	'small'
]

export default {
	argTypes: {
		children: { control: 'text' },
		icon: { control: { disable: true } },
		size: {
			control: {
				options: sizeOptions,
				type: 'select'
			},
			defaultValue: 'default'
		}
	},
	component: Avatar,
	title: 'Avatar'
} as Meta

const Template: Story<AvatarProps> = args => <Avatar {...args} />

export const Default = Template.bind({})
Default.args = { children: 'D' }

export const Icon = Template.bind({})
Icon.argTypes = {
	children: { control: { disable: true } }
}
Icon.args = {
	icon: <DassanaIcon iconKey='dassana' />
}
