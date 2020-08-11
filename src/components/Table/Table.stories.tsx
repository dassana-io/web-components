import React from 'react'
import Table, { TableProps, ColumnType } from './Table'

export default {
	title: 'Table',
	component: Table,
	excludeStories: /.*Data$/
}

export interface User {
	firstName: string
	age: number
	address: string
}

const columns: ColumnType<User>[] = [
	{
		title: 'First Name',
		dataIndex: 'firstName'
	},
	{
		title: 'Age',
		dataIndex: 'age'
	},
	{
		title: 'Address',
		dataIndex: 'address'
	}
]

const data: User[] = [
	{
		firstName: 'Dolor Sit',
		age: 30,
		address: 'San Francisco'
	},
	{
		firstName: 'Lorem Ipsum',
		age: 20,
		address: 'San Jose'
	},
	{
		firstName: 'Random Person',
		age: 30,
		address: 'Sunnyvale'
	}
]

export const tableData: TableProps<User> = {
	data,
	columns
}

export const Default = () => <Table<User> {...tableData}>Default</Table>
