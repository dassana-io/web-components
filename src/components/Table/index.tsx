import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { useStyles } from './styles'
import { ColumnType, DataId } from './types'
import { mapData, mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, Key, useCallback, useState } from 'react'

export interface OnRowClick<Data> {
	(data: Data, rowIndex: number): void
}

export interface SearchProps {
	/**
	 * Describes expected value of element
	 */
	placeholder?: string
	/**
	 * Which side of the table to render the search bar in. Defaults to 'right'
	 */
	placement?: 'left' | 'right'
}

export interface TableProps<Data> extends CommonComponentProps {
	activeRowKey?: Key
	/**
	 * Array of classes to pass to button.
	 */
	classes?: string[]
	/**
	 * Array of column objects
	 */
	columns: ColumnType[]
	/**
	 * Array of data objects
	 */
	data: Array<Data & DataId>
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick<Data & DataId>
	showRowActionIcon?: boolean
	/**
	 * Optional prop to enable/disable table search.
	 */
	search?: boolean
	/**
	 * Optional props for search input.
	 */
	searchProps?: SearchProps
}

// eslint-disable-next-line comma-spacing
export const Table = <Data,>({
	activeRowKey = '',
	classes = [],
	columns,
	data,
	dataTag,
	onRowClick,
	search = true,
	searchProps = {} as SearchProps,
	showRowActionIcon = false
}: TableProps<Data>) => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<Array<Data & DataId>>([])

	const tableClasses = useStyles({
		onRowClick,
		searchProps,
		showRowActionIcon
	})

	const mappedData = mapData<Data & DataId>(data)
	const processedColumns = processColumns<Data & DataId>(columns)
	const processedData = processData<Data & DataId>(data, columns)

	const delayedSearch = useCallback(
		debounce(q => searchTable(q), 250),
		[processedData]
	)

	const fuse = new Fuse(processedData, {
		isCaseSensitive: false,
		keys: mapFilterKeys(columns),
		threshold: 0.1
	})

	const getRowClassName = (record: Data & DataId, _: number) =>
		cn({
			[tableClasses.activeRow]: onRowClick && activeRowKey === record.key,
			[tableClasses.row]: true
		})

	const getRowKey = (record: Data & DataId) => `${record.key}`

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		delayedSearch(e.target.value)

	const searchTable = (value: string) => {
		setSearchTerm(value)

		const filteredData = fuse
			.search(value)
			.map(
				({ item }: Fuse.FuseResult<Data & DataId>): Data & DataId =>
					item
			)

		setFilteredData(filteredData)
	}

	let optionalProps = {}

	if (onRowClick) {
		optionalProps = {
			onRow: (record: Record<string, any>, rowIndex: number) => ({
				onClick: () => onRowClick(mappedData[record.id], rowIndex)
			})
		}
	}

	return (
		<div className={cn(tableClasses.tableContainer, classes)}>
			{search && (
				<Input
					classes={[tableClasses.searchBar]}
					dataTag='table-search'
					onChange={handleChange}
					placeholder={searchProps.placeholder}
				/>
			)}
			<AntDTable
				columns={processedColumns}
				dataSource={searchTerm ? filteredData : processedData}
				rowClassName={getRowClassName}
				rowKey={getRowKey}
				{...getDataTestAttributeProp('table', dataTag)}
				{...optionalProps}
			/>
		</div>
	)
}

export * from './types'
