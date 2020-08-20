import React from 'react'
import Icon, { IconProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	component: Icon,
	title: 'Icon'
} as Meta

const Template: Story<IconProps> = args => <Icon {...args} />

export const DassanaBlue = Template.bind({})
DassanaBlue.args = {
	height: 64,
	iconKey: 'dassana-blue'
}

export const DassanaOrange = Template.bind({})
DassanaOrange.args = {
	iconKey: 'dassana-orange'
}

export const AWS = Template.bind({})
AWS.args = {
	height: 64,
	iconKey: 'aws-logo'
}
