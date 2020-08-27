import { ColumnType as AntDColumnType } from 'antd/es/table'
import bytes from 'bytes'
import { ColumnType } from '.'
import moment from 'moment'
import Icon, { IconProps } from '../Icon'
import Link, { LinkProps } from '../Link'
import React, { Key } from 'react'
import Tag, { TagProps } from '../Tag'
import Toggle, { ToggleProps } from '../Toggle'

/* ---------- Logic related to parsing columns ---------- */
function compareStrings(column: ColumnType) {
	return (a: any, b: any) =>
		a[column.dataIndex].localeCompare(b[column.dataIndex])
}

function compareNumbers(column: ColumnType) {
	return (a: any, b: any) => a[column.dataIndex] - b[column.dataIndex]
}

function compareChildren(column: ColumnType) {
	return (a: any, b: any) =>
		a[column.dataIndex]['children'].localeCompare(
			b[column.dataIndex]['children']
		)
}

function compareIcons(column: ColumnType) {
	return (a: any, b: any) => {
		const compareValA: string = a[column.dataIndex].iconKey
			? a[column.dataIndex].iconKey
			: a[column.dataIndex].icon
		const compareValB: string = b[column.dataIndex].iconKey
			? b[column.dataIndex].iconKey
			: b[column.dataIndex].icon

		return compareValA.localeCompare(compareValB)
	}
}

function applySort<DataTypeType, DataFormatType, DataType>(
	type: DataTypeType,
	format: DataFormatType,
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	const strType = String(type),
		strFormat = String(format)

	if (strType === 'component') {
		if (strFormat === 'link' || strFormat === 'tag')
			antDColumn.sorter = compareChildren(column)
		else if (strType === 'component' && strFormat === 'icon')
			antDColumn.sorter = compareIcons(column)
	} else if (strType === 'string') {
		antDColumn.sorter = compareStrings(column)
	} else if (strType === 'number') antDColumn.sorter = compareNumbers(column)
}

function applyRender<DataTypeType, DataFormatType, DataType>(
	type: DataTypeType,
	format: DataFormatType,
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	const strType = String(type),
		strFormat = String(format)

	if (strType === 'number') {
		if (strFormat === 'byte') {
			antDColumn.render = number => bytes(number)
		} else if (strFormat === 'date') {
			let displayFormat: string | undefined = ''

			if ('displayFormat' in column) displayFormat = column.displayFormat

			antDColumn.render = number => moment(number).format(displayFormat)
		}
	} else if (strType === 'component') {
		if (strFormat === 'icon') {
			antDColumn.render = (props: IconProps) => <Icon {...props} />
		} else if (strFormat === 'link') {
			antDColumn.render = (props: LinkProps) => <Link {...props} />
		} else if (strFormat === 'tag') {
			antDColumn.render = (props: TagProps) => <Tag {...props} />
		} else if (strFormat === 'toggle') {
			antDColumn.render = (props: ToggleProps) => <Toggle {...props} />
		}
	}
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

		type DataFormatType = typeof format
		type DataTypeType = typeof type

		applyRender<DataTypeType, DataFormatType, DataType>(
			type,
			format,
			column,
			antDColumn
		)

		if (sort !== false) {
			applySort<DataTypeType, DataFormatType, DataType>(
				type,
				format,
				column,
				antDColumn
			)
		}

		processedColumns.push(antDColumn)
	}

	return processedColumns
}

/* ---------- Logic related to parsing data ---------- */
export function processData<DataType>(data: DataType[]) {
	const processedData: DataType[] = []

	let i: Key = 0

	for (const item of data) {
		const row = {
			...item,
			key: i++
		}
		console.log(row)
		processedData.push(row)
	}
	return processedData
}
