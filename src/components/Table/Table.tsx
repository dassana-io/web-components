import React, { FC } from 'react'
import { Table as AntTable} from 'antd'
import { ColumnsType } from 'antd/es/table'
import 'antd/dist/antd.css'

export type { ColumnsType } 

export type DataType = Record<string, string | number>

export interface TableProps {
  data: DataType[]
  columns: ColumnsType<DataType>
	classes?: string[]
}

const Table: FC<TableProps> = ({ columns, data }: TableProps) => {
	return <AntTable<DataType> columns={columns} dataSource={data} />
}

export default Table
