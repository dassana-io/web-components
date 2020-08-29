import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import Fuse from 'fuse.js'
import Input from '../Input'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, ReactElement, useState } from 'react'

interface ColumnPartialType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface DefaultNumberType extends ColumnPartialType {
	type: 'number'
	format?: 'none'
}

interface NumberDataType extends Omit<DefaultNumberType, 'format'> {
	format?: 'byte'
}

interface NumberDateType extends Omit<DefaultNumberType, 'format'> {
	format?: 'date'
	displayFormat?: string
}

export type NumberType = DefaultNumberType | NumberDataType | NumberDateType

export interface StringType extends ColumnPartialType {
	type: 'string'
	format?: 'none'
}

export interface ComponentType extends ColumnPartialType {
	type: 'component'
	format: 'icon' | 'link' | 'tag' | 'toggle'
}

export type ColumnType = StringType | NumberType | ComponentType

export interface TableProps<DataType> {
	/**
	 * Array of data objects
	 */
	data: DataType[]
	/**
	 * Array of column objects
	 */
	columns: ColumnType[]
	/**
	 * Optional prop to enable/disable table search.
	 */
	search?: boolean
}

function Table<DataType extends object>({
	columns,
	data,
	search = true
}: TableProps<DataType>): ReactElement {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<DataType[]>([])

	const processedColumns = processColumns<DataType>(columns)
	const processedData = processData<DataType>(data, columns)
	const fuseOptions = {
		isCaseSensitive: false,
		keys: mapFilterKeys(columns),
		threshold: 0.1
	}
	const fuse = new Fuse(processedData, fuseOptions)

	const searchTable = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		const filteredData = fuse
			.search(e.target.value)
			.map(({ item }: Fuse.FuseResult<DataType>): DataType => item)
		setFilteredData(filteredData)
	}

	return (
		<div>
			{search && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginBottom: 16
					}}
				>
					<Input
						onChange={searchTable}
						placeholder='Search table...'
					/>
				</div>
			)}

			<AntDTable<DataType>
				columns={processedColumns}
				dataSource={searchTerm ? filteredData : processedData}
			/>
		</div>
	)
}

export default Table
