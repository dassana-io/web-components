import noop from 'lodash/noop'
import React from 'react'
import { BreadCrumbProps, Breadcrumbs } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		checked: { control: { disable: true } },
		label: { control: 'text' }
	},
	component: Breadcrumbs,
	title: 'BreadCrumbs'
} as Meta

const Template: Story<BreadCrumbProps> = args => <Breadcrumbs {...args} />

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
