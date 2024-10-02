import { action } from '@storybook/addon-actions'
import React from 'react'
import { Link, type LinkProps } from '.'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
	argTypes: {
		children: { control: 'text' },
		classes: { control: 'object' }
	},
	component: Link,
	title: 'Link'
} as Meta

const Template: StoryFn<LinkProps> = args => <Link {...args} />

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
