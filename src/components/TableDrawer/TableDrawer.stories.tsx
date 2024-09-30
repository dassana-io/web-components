import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'
import tableData0, { type Policy } from './fixtures/0_sample_data'
import { TableDrawer, type TableDrawerProps } from '.'

export default {
	argTypes: {
		classes: { control: 'object' }
	},
	component: TableDrawer,
	title: 'TableDrawer'
} as Meta

const SimpleDrawerTemplate: StoryFn<TableDrawerProps<Policy>> = args => (
	<TableDrawer<Policy> {...args} />
)

export const SimpleDrawer = SimpleDrawerTemplate.bind({})
SimpleDrawer.args = tableData0
