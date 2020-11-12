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
import { ColumnType, ParentDataType } from './types'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'

export interface OnRowClick<DataType> {
	(data: DataType, rowIndex: number): void
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

export interface TableProps<DataType> extends CommonComponentProps {
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
	data: DataType[]
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick<DataType>
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

export function Table<DataType extends ParentDataType>({
	classes = [],
	columns,
	data,
	dataTag,
	onRowClick,
	showRowActionIcon = false,
	search = true,
	searchProps = {} as SearchProps
}: TableProps<DataType>): ReactElement {
	const [activeRowKey, setActiveRowKey] = useState('')
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<DataType[]>([])

	const tableClasses = useStyles({ searchProps })

	const processedColumns = processColumns<DataType>(columns)
	const processedData = processData<DataType>(data, columns)

	const delayedSearch = useCallback(
		debounce(q => searchTable(q), 250),
		[processedData]
	)

	const fuse = new Fuse(processedData, {
		isCaseSensitive: false,
		keys: mapFilterKeys(columns),
		threshold: 0.1
	})

	const getRowClassName = (record: DataType, _: number) =>
		cn({
			[tableClasses.activeRow]: activeRowKey === record.key,
			[tableClasses.row]: true,
			[tableClasses.rowActionIconActive]:
				showRowActionIcon && activeRowKey === record.key,
			[tableClasses.rowActionIconHover]: showRowActionIcon && onRowClick,
			[tableClasses.rowClickable]: onRowClick,
			[tableClasses.rowWithActionIcon]: showRowActionIcon
		})

	const getRowKey = (record: DataType) => `${record.key}`

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		delayedSearch(e.target.value)

	const searchTable = (value: string) => {
		setSearchTerm(value)

		const filteredData = fuse
			.search(value)
			.map(({ item }: Fuse.FuseResult<DataType>): DataType => item)

		setFilteredData(filteredData)
	}

	let optionalProps = {}

	if (onRowClick) {
		optionalProps = {
			onRow: (record: Record<string, any>, rowIndex: number) => ({
				onClick: () => {
					activeRowKey === record.key
						? setActiveRowKey('')
						: setActiveRowKey(record.key)

					onRowClick(data[rowIndex], rowIndex)
				}
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
