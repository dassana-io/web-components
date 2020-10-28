import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import { createUseStyles } from 'react-jss'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { styleguide } from 'components/assets/styles'
import { ColumnType, ParentDataType } from './types'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'

export interface OnRowClick {
	(data: Record<string, any>, rowIndex: number): void
}

const { spacing } = styleguide

const useStyles = createUseStyles({
	searchBar: {
		alignSelf: props =>
			props.searchProps.placement === 'right' ? 'flex-end' : 'flex-start',
		marginBottom: spacing.m
	},
	tableContainer: {
		display: 'flex',
		flexDirection: 'column'
	}
})

export interface SearchProps {
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
	onRowClick?: OnRowClick
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
	search = true,
	searchProps = {}
}: TableProps<DataType>): ReactElement {
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
			onRow: (rowData: Record<string, any>, rowIndex: number) => ({
				onClick: () => onRowClick(data[rowIndex], rowIndex)
			})
		}
	}

	let optionalSearchProps = {}

	if (search) {
		optionalSearchProps = {
			placeholder: searchProps.placeholder ? searchProps.placeholder : ''
		}
	}

	return (
		<div className={cn(tableClasses.tableContainer, classes)}>
			{search && (
				<Input
					classes={[tableClasses.searchBar]}
					dataTag='table-search'
					onChange={handleChange}
					{...optionalSearchProps}
				/>
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
