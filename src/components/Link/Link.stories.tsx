import { action } from '@storybook/addon-actions'
import React from 'react'
import { Link, LinkProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'array' }
	},
	component: Link,
	title: 'Link'
} as Meta

const Template: Story<LinkProps> = args => <Link {...args} />

export const Href = Template.bind({})
Href.argTypes = {
	onClick: {
		control: { disable: true }
	}
}
Href.args = {
	children: 'Href',
	href: ' '
}

export const Click = Template.bind({})
Click.argTypes = {
	href: {
		control: { disable: true }
	}
}
Click.args = {
	children: 'Click',
	onClick: action('onClick')
}
