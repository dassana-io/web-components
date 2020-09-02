import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import Input from '../Input'
import { ColumnType, ParentDataType } from './types'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, ReactElement, useState } from 'react'

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

function Table<DataType extends ParentDataType>({
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

	const debouncedSearch = (
		searchFn: (e: ChangeEvent<HTMLInputElement>) => void,
		time: number
	) => {
		const debounced = debounce(searchFn, time)

		return function (e: ChangeEvent<HTMLInputElement>) {
			e.persist()
			return debounced(e)
		}
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
						onChange={debouncedSearch(searchTable, 250)}
						placeholder='Search table...'
					/>
				</div>
			)}

			<AntDTable
				columns={processedColumns}
				dataSource={searchTerm ? filteredData : processedData}
			/>
		</div>
	)
}

export * from './types'
export default Table
