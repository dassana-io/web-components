import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'
import { Table as AntDTable } from 'antd'
import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import Input from '../Input'
import { SharedIconProps } from '../Icon'
import { SharedLinkProps } from '../Link'
import { ToggleProps } from '../Toggle'
import { mapFilterKeys, processColumns, processData } from './utils'
import React, { ChangeEvent, ReactElement, useState } from 'react'

interface PartialColumnType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface DefaultNumberType extends PartialColumnType {
	type: 'number'
	format?: 'none'
}

interface NumberByteType extends Omit<DefaultNumberType, 'format'> {
	format: 'byte'
}

interface NumberDateType extends Omit<DefaultNumberType, 'format'> {
	format: 'date'
	renderProps?: {
		displayFormat?: string
	}
}

export type NumberType = DefaultNumberType | NumberByteType | NumberDateType

export interface StringType extends PartialColumnType {
	type: 'string'
	format?: 'none'
}

interface PartialComponentType extends PartialColumnType {
	type: 'component'
}

interface IconType extends PartialComponentType, SharedIconProps {
	format: 'icon'
	renderProps: {
		type: 'icon' | 'iconKey'
	}
}

interface LinkType
	extends PartialComponentType,
		Pick<SharedLinkProps, 'target'> {
	format: 'link'
	renderProps?: {
		buildHref: (record: string) => string
	}
}

interface TagType extends PartialComponentType {
	format: 'tag'
}

interface ToggleType extends PartialComponentType, Pick<ToggleProps, 'size'> {
	format: 'toggle'
}

type ComponentType = IconType | LinkType | TagType | ToggleType

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

			<AntDTable<DataType>
				columns={processedColumns}
				dataSource={searchTerm ? filteredData : processedData}
			/>
		</div>
	)
}

export default Table
