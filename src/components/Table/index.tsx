import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { TableSkeleton } from './Table.skeleton'
import { useStyles } from './styles'
import { ColumnType, TableData } from './types'
import { mapData, mapFilterKeys, processColumns, processData } from './utils'
import React, {
	ChangeEvent,
	Key,
	useCallback,
	useEffect,
	useState
} from 'react'

export interface OnRowClick<TableData> {
	(data: TableData, rowIndex: number): void
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
	/**
	 * Key(id) of active row if onRowClick exists
	 */
	activeRowKey?: Key
	/**
	 * Array of classes to pass to Table
	 */
	classes?: string[]
	/**
	 * Array of column objects
	 */
	columns: ColumnType[]
	/**
	 * Array of data objects
	 */
	data: TableData<Data>[]
	loading?: boolean
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick<TableData<Data>>
	/**
	 * Optional prop to enable/disable table search
	 */
	search?: boolean
	skeletonRowCount?: number
	/**
	 * Optional props for search input
	 */
	searchProps?: SearchProps
}

/* TODO: Add Table props to allow customization of pagination. */
type Pagination = false | { showSizeChanger: false }

// eslint-disable-next-line comma-spacing
export const Table = <Data,>({
	activeRowKey = '',
	classes = [],
	columns,
	data,
	dataTag,
	loading = false,
	onRowClick,
	search = true,
	skeletonRowCount = 5,
	searchProps = {} as SearchProps
}: TableProps<Data>) => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<TableData<Data>[]>([])
	const [pagination, setPagination] = useState<Pagination>(false)

	const tableClasses = useStyles({
		onRowClick,
		searchProps
	})

	const [mappedData, setMappedData] = useState(mapData<TableData<Data>>(data))
	const [processedColumns, setProcessedColumns] = useState(
		processColumns<TableData<Data>>(columns)
	)
	const [processedData, setProcessedData] = useState(
		processData<TableData<Data>>(data, columns)
	)

	useEffect(() => {
		setMappedData(mapData<TableData<Data>>(data))

		if (data.length > 10) setPagination({ showSizeChanger: false })
		else setPagination(false)
	}, [data])

	useEffect(() => {
		setProcessedColumns(processColumns<TableData<Data>>(columns))
	}, [columns])

	useEffect(() => {
		setProcessedData(processData<TableData<Data>>(data, columns))
	}, [columns, data])

	const delayedSearch = useCallback(
		debounce(q => searchTable(q), 250),
		[processedData]
	)

	const fuse = new Fuse(processedData, {
		isCaseSensitive: false,
		keys: mapFilterKeys(columns),
		threshold: 0.1
	})

	const getRowClassName = (record: TableData<Data>, _: number) =>
		cn({
			[tableClasses.activeRow]: onRowClick && activeRowKey === record.key,
			[tableClasses.row]: true
		})

	const getRowKey = (record: TableData<Data>) => record.key

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		delayedSearch(e.target.value)

	const searchTable = (value: string) => {
		setSearchTerm(value)

		const filteredData = fuse
			.search(value)
			.map(
				({ item }: Fuse.FuseResult<TableData<Data>>): TableData<Data> =>
					item
			)

		setFilteredData(filteredData)
	}

	const optionalProps: Record<string, any> = {}

	if (onRowClick) {
		optionalProps.onRow = (
			record: Record<string, any>,
			rowIndex: number
		) => ({
			onClick: () => onRowClick(mappedData[record.id], rowIndex)
		})
	}

	return loading ? (
		<TableSkeleton columns={columns} rowCount={skeletonRowCount} />
	) : (
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
				pagination={pagination}
				rowClassName={getRowClassName}
				rowKey={getRowKey}
				{...getDataTestAttributeProp('table', dataTag)}
				{...optionalProps}
			/>
		</div>
	)
}

export * from './types'
