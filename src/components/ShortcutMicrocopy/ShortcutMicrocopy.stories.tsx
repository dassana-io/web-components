import { EnterOutlined } from '@ant-design/icons'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import { ShortcutMicrocopy, type ShortcutMicrocopyProps } from './index'

export default {
	argTypes: {
		loading: { control: 'boolean' }
	},
	title: 'ShortcutMicrocopy'
} as Meta

const Template: Story<ShortcutMicrocopyProps> = args => (
	<ShortcutMicrocopy {...args} />
)

export const Default = Template.bind({})

export const PredefinedKeys = Template.bind({})
PredefinedKeys.args = {
	items: ['cmd', 'enter']
}

export const Mixed = Template.bind({})
Mixed.args = {
	items: ['cmd', { icon: <EnterOutlined />, text: 'Enter' }]
}

export const IconOnly = Template.bind({})
IconOnly.args = {
	items: [{ icon: '⌘' }]
}
