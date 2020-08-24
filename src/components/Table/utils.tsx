import { ColumnType as AntDColumnType } from 'antd/es/table'
import {
	ColumnType,
	Icon,
	IconProps,
	Link,
	LinkProps,
	Tag,
	TagProps,
	Toggle,
	ToggleProps
} from './types'
import React, { Key } from 'react'

function sortStringCompare(column: ColumnType) {
	return (a: any, b: any) =>
		a[column.dataIndex].localeCompare(b[column.dataIndex])
}

function sortNumberCompare(column: ColumnType) {
	return (a: any, b: any) => a[column.dataIndex] - b[column.dataIndex]
}

function mapColTypeFormat(columns: ColumnType[]) {
	const mapped: Record<string, {}> = {}
	for (const col of columns) {
		mapped[col.dataIndex] = { format: col.format, type: col.type }
	}

	return mapped
}

export function processData<DataType>(data: DataType[], columns: ColumnType[]) {
	const mappedColTypeFormat = mapColTypeFormat(columns)
	/*
  TODO: Throw error if data type doesn't match column type and format?
  TYPESCRIPT CHECK?
  */
	console.log(mappedColTypeFormat)

	const processedData: DataType[] = []

	let i: Key = 0

	for (const item of data) {
		const row = {
			...item,
			key: i++
		}
		processedData.push(row)
	}
	return processedData
}

export function processColumns<DataType>(columns: ColumnType[]) {
	const processedColumns: AntDColumnType<DataType>[] = []

	for (const column of columns) {
		const { dataIndex, format, title, sort, type } = column

		const antDColumn: AntDColumnType<DataType> = {
			dataIndex,
			showSorterTooltip: false,
			title
		}

		if (type === 'component') {
			if (format === 'icon') {
				antDColumn.render = (props: IconProps) => <Icon {...props} />
			}
			if (format === 'link') {
				antDColumn.render = (props: LinkProps) => <Link {...props} />
			}
			if (format === 'tag') {
				antDColumn.render = (props: TagProps) => <Tag {...props} />
			}
			if (format === 'toggle') {
				antDColumn.render = (props: ToggleProps) => (
					<Toggle {...props} />
				)
			}
		}

		if (sort === undefined || sort) {
			if (type === 'string') antDColumn.sorter = sortStringCompare(column)
			if (type === 'number') antDColumn.sorter = sortNumberCompare(column)
		}

		processedColumns.push(antDColumn)
	}

	return processedColumns
}
