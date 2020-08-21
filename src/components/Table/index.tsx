import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import { processColumns, processData } from './utils'
import React, { ReactElement } from 'react'

interface ColumnPartialType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface StringType {
	type: 'string'
	format?: 'none'
}

interface NumberType {
	type: 'number'
	format?: 'none' | 'date' | 'bytes'
}

interface ComponentType {
	type: 'component'
	format?: 'link' | 'toggle' | 'tag' | 'icon'
}

export type ColumnType = ColumnPartialType &
	(StringType | NumberType | ComponentType)

export interface TableProps<DataType> {
	data: DataType[]
	columns: ColumnType[]
}

function Table<DataType extends object>({
	columns,
	data
}: TableProps<DataType>): ReactElement {
	const processedData = processData<DataType>(data)
	const processedColumns = processColumns<DataType>(columns)

	return (
		<AntDTable<DataType>
			columns={processedColumns}
			dataSource={processedData}
		/>
	)
}

export default Table
