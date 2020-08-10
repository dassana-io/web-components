import React from 'react'
import Table, { TableProps, DataType, ColumnsType } from './Table'

export default {
	title: 'Table',
	component: Table,
	excludeStories: /.*Data$/
}

const columns: ColumnsType<DataType> = [
	{
		key: 'name',
		title: 'Name',
		dataIndex: 'name'
	},
	{ title: 'Age', key: 'age', dataIndex: 'age' },
	{ title: 'Address', key: 'address', dataIndex: 'address' }
]

const data: DataType[] = [
	{
		key: 0,
		name: 'Dolor Sit',
		age: 30,
		address: 'San Francisco'
	},
	{
		key: 1,
		name: 'Lorem Ipsum',
		age: 20,
		address: 'San Jose'
	},
	{
		key: 2,
		name: 'Consectetur Unde',
		age: 30,
		address: 'Sunnyvale'
	}
]

export const tableData: TableProps = {
	data,
	columns
}

export const Default = () => <Table {...tableData}>Default</Table>
