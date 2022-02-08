import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import cloneDeep from 'lodash/cloneDeep'
import cn from 'classnames'
import { CommonComponentProps } from '../types'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { getDataTestAttributeProp } from '../utils'
import { Input } from '../Input'
import { TableCtxProvider } from './TableContext'
import { TableSkeleton } from './TableSkeleton'
import { useStyles } from './styles'
import { useWindowSize } from '@dassana-io/web-utils'
import { AdditionalPaletteColors, ColumnType, TableData } from './types'
import { mapData, mapFilterKeys, processColumns, processData } from './utils'
import React, {
	ChangeEvent,
	Key,
	ReactNode,
	useCallback,
	useEffect,
	useState
} from 'react'

export interface OnRowClick<TableData> {
	(data: TableData, rowIndex: number): void
}

export interface ScrollConfig {
	/**
	 * whether the table is scrollable on mobile only
	 * @default true
	 */
	mobileOnly?: boolean
	x: number
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
	additionalColorPalette?: AdditionalPaletteColors
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
	/**
	 * Whether or not to show skeleton loader
	 */
	loading?: boolean
	/**
	 * Optional callback that runs when a table row is clicked
	 */
	onRowClick?: OnRowClick<TableData<Data>>
	/**
	 * Optional Table Pagination config that determines the numbers of table rows to render per page
	 */
	paginationConfig?: { rowCount?: number }
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
	tableRef?: React.Ref<HTMLDivElement>
}

/* Pagination config props type that gets passed to AntDTable  */
type Pagination = false | { defaultPageSize?: number; showSizeChanger: false }

// eslint-disable-next-line comma-spacing
export const Table = <Data,>({
	activeRowKey = '',
	additionalColorPalette,
	classes = [],
	columns,
	controls = true,
	data,
	dataTag,
	loading = false,
	paginationConfig = {},
	onRowClick,
	tableControlsConfig = {},
	tableRef,
	scrollConfig,
	search = true,
	skeletonRowCount = 5,
	searchProps = {} as SearchProps
}: TableProps<Data>) => {
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

	const tableClasses = useStyles({
		additionalColorPalette,
		onRowClick,
		searchProps
	})

	const [mappedData, setMappedData] = useState(mapData<TableData<Data>>(data))
	const [processedData, setProcessedData] = useState(
		processData<TableData<Data>>(data, columns)
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
		setMappedData(mapData<TableData<Data>>(data))
	}, [data])

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
		setProcessedData(processData<TableData<Data>>(data, columns))
	}, [columns, data])

	const delayedSearch = debounce(q => searchTable(q), 250)

	const fuse = new Fuse(processedData, {
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

	if (onRowClick) {
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
				x: scrollConfig.x
			}
		}
	} else if (width <= 768) {
		scrollProps = {
			scroll: {
				x: scrollConfig ? scrollConfig.x : columns.length * 150
			}
		}
	}

	if (skeletonRowCount < 1)
		throw new Error('skeletonRowCount must be a positive integer')

	return (
		<TableCtxProvider value={{ isMobile }}>
			<div
				className={cn(tableClasses.tableContainer, classes)}
				ref={tableRef}
			>
				{controls && (
					<div
						className={cn(
							tableClasses.tableControls,
							tableControlClasses
						)}
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
					<AntDTable
						columns={processedColumns}
						dataSource={searchTerm ? filteredData : processedData}
						pagination={
							!pagination
								? pagination
								: { ...pagination, responsive: true }
						}
						rowClassName={getRowClassName}
						rowKey={getRowKey}
						{...getDataTestAttributeProp('table', dataTag)}
						{...optionalProps}
						{...scrollProps}
					/>
				)}
			</div>
		</TableCtxProvider>
	)
}

export * from './types'
export { PARTIAL_ACTION_COLUMN } from './utils'
