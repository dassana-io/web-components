import React, { ReactElement, Key } from 'react'
import { Table as AntDTable } from 'antd'
import { ColumnType as AntDColumnType } from 'antd/es/table'
import 'antd/dist/antd.css'

export interface ColumnType<DataType> extends AntDColumnType<DataType> {
	dataIndex: string
	title: string
}

export interface TableProps<DataType> {
	data: DataType[]
	columns: ColumnType<DataType>[]
}

function Table<DataType extends object>({
	columns,
	data
}: TableProps<DataType>): ReactElement {
	let i: Key = 0

	const processedData: DataType[] = []

	for (const item of data) {
		const row = {
			...item,
			key: i++
		}
		processedData.push(row)
	}

	return <AntDTable<DataType> columns={columns} dataSource={processedData} />
}

export default Table
