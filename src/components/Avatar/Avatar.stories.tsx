import { Icon as DassanaIcon } from '../Icon'
import React from 'react'
import { Avatar, AvatarProps } from './index'
import { Meta, StoryFn } from '@storybook/react'

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

const Template: StoryFn<AvatarProps> = (args: AvatarProps) => (
	<Avatar {...args} />
)

export const Default = Template.bind({})
Default.args = { children: 'D' }

export const Icon = Template.bind({})
Icon.argTypes = {
	children: { control: { disable: true } }
}
Icon.args = {
	icon: <DassanaIcon iconKey='dassana' />
}
