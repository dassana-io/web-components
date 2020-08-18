import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import { processColumns, processData } from './utils'
import React, { ReactElement } from 'react'

export interface ColumnType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	type: 'string' | 'number'
	sort?: boolean
}

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
