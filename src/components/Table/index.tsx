import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import { CommonComponentProps } from '../types'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { ColumnType, ParentDataType } from './types'
import {
	mapFilterKeys,
	processColumns,
	processData,
	revertDataItem
} from './utils'
import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'

export interface OnRowClick {
	(data: Record<string, any>, rowIndex: number): void
}

export interface TableProps<DataType> extends CommonComponentProps {
	/**
	 * Array of column objects
	 */
	columns: ColumnType[]
	/**
	 * Array of data objects
	 */
	data: DataType[]
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick
	/**
	 * Optional prop to enable/disable table search.
	 */
	search?: boolean
}

export function Table<DataType extends ParentDataType>({
	columns,
	data,
	dataTag,
	onRowClick,
	search = true
}: TableProps<DataType>): ReactElement {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<DataType[]>([])
	const delayedSearch = useCallback(
		debounce(q => searchTable(q), 250),
		[]
	)

	const processedColumns = processColumns<DataType>(columns)
	const processedData = processData<DataType>(data, columns)

	const fuse = new Fuse(processedData, {
		isCaseSensitive: false,
		keys: mapFilterKeys(columns),
		threshold: 0.1
	})

	const searchTable = (value: string) => {
		setSearchTerm(value)

		const filteredData = fuse
			.search(value)
			.map(({ item }: Fuse.FuseResult<DataType>): DataType => item)

		setFilteredData(filteredData)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		delayedSearch(e.target.value)

	let optionalProps = {}

	if (onRowClick) {
		optionalProps = {
			onRow: (data: Record<string, any>, rowIndex: number) => ({
				onClick: () => {
					onRowClick(revertDataItem(data), rowIndex)
				}
			})
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
						dataTag='table-search'
						onChange={handleChange}
						placeholder='Search table...'
					/>
				</div>
			)}

			<AntDTable
				columns={processedColumns}
				dataSource={searchTerm ? filteredData : processedData}
				{...getDataTestAttributeProp('table', dataTag)}
				{...optionalProps}
			/>
		</div>
	)
}

export * from './types'
