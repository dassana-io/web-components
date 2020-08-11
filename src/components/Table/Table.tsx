import React, { ReactElement } from 'react'
import { Table as AntDTable } from 'antd'
import { ColumnType as AntDColumnType } from 'antd/es/table'
import 'antd/dist/antd.css'

export interface ColumnType<T> extends AntDColumnType<T> {
	dataIndex: string
	title: string
}

export interface TableProps<T> {
	data: T[]
	columns: ColumnType<T>[]
}

function Table<T extends object>({
	columns,
	data
}: TableProps<T>): ReactElement {
	return <AntDTable<T> columns={columns} dataSource={data} />
}

export default Table
