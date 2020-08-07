import React from 'react'
import { Table, TableProps, ColumnType } from './index'

export default {
	title: 'Table',
	component: Table,
	excludeStories: /.*Data$/
}

const data = [
	{ name: 'Dolor Sit', age: 30, married: true, address: 'San Francisco' },
	{ name: 'Lorem Ipsum', age: 20, married: false, address: 'San Jose' },
	{ name: 'Consectetur Unde', age: 30, married: false, address: 'Sunnyvale' }
]

const columns: ColumnType[] = [
	{ label: 'Name', key: 'name' },
	{ label: 'Age', key: 'age' },
	{ label: 'Married', key: 'married' },
	{ label: 'Address', key: 'address' }
]
export const tableData: TableProps = {
	data,
	columns
}

export const Default = () => <Table {...tableData}>Default</Table>
