import { action } from '@storybook/addon-actions'
import React from 'react'
import Link, { LinkProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' }
	},
	component: Link,
	title: 'Link'
} as Meta

const linkProps: LinkProps = {
	children: 'Default',
	href: ' ',
	onClick: action('onClick')
}

const Template: Story<LinkProps> = args => <Link {...args} />

export const Default = Template.bind({})
Default.args = linkProps
