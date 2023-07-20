import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import tableData0, { type Policy } from './fixtures/0_sample_data'
import { TableDrawer, type TableDrawerProps } from '.'

export default {
	argTypes: {
		classes: { control: 'array' }
	},
	component: TableDrawer,
	title: 'TableDrawer'
} as Meta

const SimpleDrawerTemplate: Story<TableDrawerProps<Policy>> = args => (
	<TableDrawer<Policy> {...args} />
)

export const SimpleDrawer = SimpleDrawerTemplate.bind({})
SimpleDrawer.args = tableData0
