import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Table, { ColumnType, TableProps } from '.'

export default {
	component: Table,
	excludeStories: /.*Data$/,
	title: 'Table'
} as Meta

export interface User {
	firstName: string
	age: number
	address: string
}

const columns: ColumnType[] = [
	{
		dataIndex: 'firstName',
		title: 'First Name',
		type: 'string'
	},
	{
		dataIndex: 'age',
		title: 'Age',
		type: 'number'
	},
	{
		dataIndex: 'address',
		sort: false,
		title: 'Address',
		type: 'string'
	}
]

const data: User[] = [
	{
		address: 'San Francisco',
		age: 30,
		firstName: 'Dolor Sit'
	},
	{
		address: 'San Jose',
		age: 20,
		firstName: 'Lorem Ipsum'
	},
	{
		address: 'Sunnyvale',
		age: 35,
		firstName: 'Amet Consectetur'
	}
]

export const tableData: TableProps<User> = {
	columns,
	data
}

const Template: Story<TableProps<User>> = args => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
	...tableData
}
