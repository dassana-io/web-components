import '../assets/styles/antdAnimations.css'
import 'antd/lib/dropdown/style/index.css'
import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import cloneDeep from 'lodash/cloneDeep'
import cn from 'classnames'
import { ColumnsType } from 'antd/lib/table'
import { CommonComponentProps } from '../types'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { TableCtxProvider } from './TableContext'
import { TableRowSelection } from 'antd/es/table/interface'
import { TableSkeleton } from './TableSkeleton'
import { unstable_batchedUpdates } from 'react-dom'
import { useStyles } from './styles'
import {
	AdditionalPaletteColors,
	ColumnType,
	ProcessedTableData,
	TableData
} from './types'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, {
	ChangeEvent,
	Key,
	ReactNode,
	RefObject,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import {
	useRemainingContainerHeight,
	useWindowSize
} from '@dassana-io/web-utils'

export interface OnRowClick<TableData> {
	(data: TableData, rowIndex: number): void
}

export interface ScrollConfig {
	/**
	 * whether the table is scrollable on mobile only
	 * @default true
	 */
	mobileOnly?: boolean
	x?: number
	y?: number
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

export interface TableControlsConfig {
	classes?: string[]
	render?: () => ReactNode
}

export interface TableProps<Data> extends CommonComponentProps {
	/**
	 * Key(id) of active row if onRowClick exists
	 */
	activeRowKey?: Key
	additionalPaletteColors?: AdditionalPaletteColors
	/**
	 * Array of classes to pass to Table
	 */
	classes?: string[]
	/**
	 * Array of column objects
	 */
	columns: ColumnType[]
	/**
	 * Optional prop to show controls
	 */
	controls?: boolean
	/**
	 * Array of data objects
	 */
	data: TableData<Data>[]
	disableRowClick?: boolean
	dynamicTableHeight?: boolean
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick<ProcessedTableData<Data>>
	/**
	 * Optional Table Pagination config that determines the numbers of table rows to render per page
	 */
	paginationConfig?: { rowCount?: number }
	rowIdKey?: string
	rowSelection?: TableRowSelection<TableData<Data>>
	tableControlsConfig?: TableControlsConfig
	scrollConfig?: ScrollConfig
	/**
	 * Optional prop to enable/disable table search
	 */
	search?: boolean
	/**
	 * Number of skeleton table rows shown if loading is set to true
	 */
	skeletonRowCount?: number
	/**
	 * Optional props for search input
	 */
	searchProps?: SearchProps
	tableRef?: RefObject<HTMLDivElement>
}

/* Pagination config props type that gets passed to AntDTable  */
type Pagination = false | { defaultPageSize?: number; showSizeChanger: false }

// eslint-disable-next-line comma-spacing
export const Table = <Data,>({
	activeRowKey = '',
	additionalPaletteColors,
	classes = [],
	columns,
	controls = true,
	data,
	dataTag,
	disableRowClick = false,
	dynamicTableHeight = false,
	loading = false,
	onRowClick,
	paginationConfig = {},
	rowIdKey = 'id',
	rowSelection,
	scrollConfig,
	search = true,
	skeletonRowCount = 5,
	searchProps = {} as SearchProps,
	tableControlsConfig = {},
	tableRef
}: TableProps<Data>) => {
	const cmpTableRef = useRef<HTMLDivElement>(null)

	const containerRef = tableRef ? tableRef : cmpTableRef
	const controlsRef = useRef<HTMLDivElement>(null)

	const containerHeight = useRemainingContainerHeight(containerRef)

	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredData, setFilteredData] = useState<TableData<Data>[]>([])

	const { rowCount = 10 } = paginationConfig
	const [pagination, setPagination] = useState<Pagination>({
		defaultPageSize: rowCount,
		showSizeChanger: false
	})

	const { classes: tableControlClasses = [], render: renderTableControls } =
		tableControlsConfig

	const {
		isMobile,
		windowSize: { width }
	} = useWindowSize()

	const tableClasses = useStyles<Data>({
		additionalPaletteColors
	})({
		disableRowClick,
		onRowClick,
		searchProps
	})

	const [mappedData, setMappedData] = useState(
		processData<TableData<Data>>(data, columns, rowIdKey).mappedData
	)
	const [processedData, setProcessedData] = useState(
		processData<TableData<Data>>(data, columns, rowIdKey).processedData
	)

	const deleteRow = useCallback(
		(rowId: Key) => {
			const updatedData = cloneDeep(processedData).filter(
				row => row.id !== rowId
			)

			setProcessedData(updatedData)
		},
		[processedData]
	)

	const updateRowData = useCallback(
		(rowId: Key, updatedData: TableData<Data>) => {
			const clonedData = cloneDeep(processedData)

			const editedEntryIndex = clonedData.findIndex(
				row => row.id === rowId
			)

			const currentData = clonedData[editedEntryIndex]

			clonedData[editedEntryIndex] = {
				...currentData,
				...updatedData
			}

			setProcessedData(clonedData)
		},
		[processedData]
	)

	const [processedColumns, setProcessedColumns] = useState(
		processColumns<TableData<Data>>(columns, {
			deleteRow,
			updateRowData
		})
	)

	useEffect(() => {
		/**
		 * If the number of rows is greater than number of rows per
		 * page(paginationConfig.rowCount), render a Table with pagination.
		 * Otherwise there aren't enough items to paginate so don't render
		 * pagination.
		 */
		if (data.length > rowCount) {
			setPagination({
				defaultPageSize: rowCount,
				showSizeChanger: false
			})
		} else setPagination(false)
	}, [data.length, rowCount])

	useEffect(() => {
		setProcessedColumns(
			processColumns<TableData<Data>>(columns, {
				deleteRow,
				updateRowData
			})
		)
	}, [columns, deleteRow, updateRowData])

	useEffect(() => {
		const { mappedData, processedData } = processData<TableData<Data>>(
			data,
			columns,
			rowIdKey
		)

		unstable_batchedUpdates(() => {
			setMappedData(mappedData)
			setProcessedData(processedData)
		})
	}, [columns, data, rowIdKey])

	const delayedSearch = debounce(q => searchTable(q), 250)

	const fuse = new Fuse(processedData, {
		findAllMatches: true,
		ignoreLocation: true,
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

	if (onRowClick && !disableRowClick) {
		optionalProps.onRow = (
			record: Record<string, any>,
			rowIndex: number
		) => ({
			onClick: () => onRowClick(mappedData[record.key], rowIndex)
		})
	}

	let scrollProps = {}

	if (scrollConfig && !scrollConfig.mobileOnly) {
		scrollProps = {
			scroll: {
				x: scrollConfig.x,
				y: scrollConfig.y
			}
		}
	} else if (width <= 768) {
		scrollProps = {
			scroll: {
				x: scrollConfig ? scrollConfig.x : columns.length * 150
			}
		}
	}

	if (dynamicTableHeight) {
		let headerHeight = 54

		const tableContainer = containerRef.current

		if (tableContainer) {
			const header = tableContainer.querySelector('thead')

			if (header) {
				headerHeight = header.clientHeight
			}
		}

		scrollProps = {
			scroll: {
				y: containerHeight - (64 + headerHeight + 50) // TODO: 64 for pagination height, 50 for row offset
			}
		}
	}

	if (skeletonRowCount < 1)
		throw new Error('skeletonRowCount must be a positive integer')

	return (
		<TableCtxProvider value={{ isMobile }}>
			<div className={cn(tableClasses.tableContainer, classes)}>
				{controls && (
					<div
						className={cn(
							tableClasses.tableControls,
							tableControlClasses
						)}
						ref={controlsRef}
					>
						{renderTableControls && renderTableControls()}
						{search && (
							<Input
								dataTag='table-search'
								fullWidth={isMobile}
								loading={loading}
								onChange={handleChange}
								placeholder={searchProps.placeholder}
							/>
						)}
					</div>
				)}
				{loading ? (
					<TableSkeleton
						columns={columns}
						rowCount={skeletonRowCount}
					/>
				) : (
					<div ref={containerRef}>
						<AntDTable
							columns={
								processedColumns as ColumnsType<TableData<Data>>
							}
							dataSource={
								searchTerm ? filteredData : processedData
							}
							pagination={
								!pagination
									? pagination
									: { ...pagination, responsive: true }
							}
							rowClassName={getRowClassName}
							rowKey={getRowKey}
							rowSelection={rowSelection}
							{...getDataTestAttributeProp('table', dataTag)}
							{...optionalProps}
							{...scrollProps}
						/>
					</div>
				)}
			</div>
		</TableCtxProvider>
	)
}

export * from './types'
export { PARTIAL_ACTION_COLUMN } from './utils'
export type { TableRowSelection }
