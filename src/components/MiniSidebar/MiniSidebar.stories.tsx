import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import { MiniSidebar, type MiniSidebarProps, SocialLinks } from '.'

export default {
	component: MiniSidebar,
	title: 'Mini Sidebar'
} as Meta

const MiniSidebarTemplate: Story<MiniSidebarProps> = args => (
	<MiniSidebar {...args} />
)

const { blog, slack } = SocialLinks

export const AllIcons = MiniSidebarTemplate.bind({})

export const SomeIcons = MiniSidebarTemplate.bind({})
SomeIcons.args = {
	socialLinksToOmit: [blog, slack]
}
