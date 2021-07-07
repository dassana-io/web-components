import React from 'react'
import { sidebarConfig1 } from './_fixtures_/01_sample_data'
import { sidebarConfig2 } from './_fixtures_/02_sample_data'
import { Meta, Story } from '@storybook/react'
import MiniSidebar, { MiniSidebarProps } from '.'

export default {
	component: MiniSidebar,
	title: 'Mini Sidebar'
} as Meta

const MiniSidebarTemplate: Story<MiniSidebarProps> = args => (
	<MiniSidebar {...args} />
)

export const AllIcons = MiniSidebarTemplate.bind({})
AllIcons.args = {
	config: sidebarConfig1
}

export const SomeIcons = MiniSidebarTemplate.bind({})
SomeIcons.args = {
	config: sidebarConfig2
}
