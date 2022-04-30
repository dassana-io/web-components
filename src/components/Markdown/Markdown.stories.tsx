import React from 'react'
import { Markdown, MarkdownProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		classes: { control: { disable: true } },
		popupContainerSelector: { control: { disable: true } }
	},
	component: Markdown,
	title: 'Markdown'
} as Meta

const mockMarkdown = `
# Lorem Ipsum

Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Ut enim ad

**Minim veniam**

1. quis nostrud exercitation [THIS IS A LINK TO GOOGLE](https://www.google.com) ullamco laboris nisi ut aliquip ex ea commodo consequat.

2. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur

3. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`

const Template: Story<MarkdownProps> = args => <Markdown {...args} />

export const Default = Template.bind({})

Default.args = {
	children: mockMarkdown
}
