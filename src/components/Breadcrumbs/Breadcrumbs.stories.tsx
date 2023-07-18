import noop from 'lodash/noop'
import React from 'react'
import { BreadCrumbProps, Breadcrumbs } from './index'
import { Meta, StoryFn } from '@storybook/react'

export default {
	argTypes: {
		checked: { control: { disable: true } },
		label: { control: 'text' }
	},
	component: Breadcrumbs,
	title: 'BreadCrumbs'
} as Meta

const Template: StoryFn<BreadCrumbProps> = args => <Breadcrumbs {...args} />

export const Default = Template.bind({})
Default.args = {
	config: [
		{
			label: 'foo',
			onClick: noop
		},
		{
			label: 'bar'
		}
	]
}
