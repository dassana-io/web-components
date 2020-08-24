import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import { TableProps } from './types'
import { processColumns, processData } from './utils'
import React, { ReactElement } from 'react'

function Table<DataType extends object>({
	columns,
	data
}: TableProps<DataType>): ReactElement {
	const processedData = processData<DataType>(data, columns)
	const processedColumns = processColumns<DataType>(columns)

	return (
		<AntDTable<DataType>
			columns={processedColumns}
			dataSource={processedData}
		/>
	)
}

export default Table
export type { TableProps }
export type { ColumnType } from './types'
