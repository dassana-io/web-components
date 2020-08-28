import { ColumnType as AntDColumnType } from 'antd/es/table'
import bytes from 'bytes'
import { ColumnType } from '.'
import moment from 'moment'
import Icon, { IconProps } from '../Icon'
import Link, { LinkProps } from '../Link'
import React, { Key } from 'react'
import Tag, { TagProps } from '../Tag'
import Toggle, { ToggleProps } from '../Toggle'

/* -*-*-*-*-*- Helpers for parsing columns -*-*-*-*-*- */

/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x
  Compare functions used by applySort to pass a custom sorter
  based on data type and format.
 */
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
/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x */

/* Sets andD column sorter prop as appropriate compare function. */
function applySort<DataTypeType, DataFormatType, DataType>(
	type: DataTypeType,
	format: DataFormatType,
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	// for typescript error
	const typeStr = String(type),
		formatStr = String(format)

	if (typeStr === 'component') {
		switch (formatStr) {
			case 'link':
				antDColumn.sorter = compareChildren(column)
				break
			case 'tag':
				antDColumn.sorter = compareChildren(column)
				break
			case 'icon':
				antDColumn.sorter = compareIcons(column)
				break
		}
	} else if (typeStr === 'string') {
		antDColumn.sorter = compareStrings(column)
	} else if (typeStr === 'number') {
		antDColumn.sorter = compareNumbers(column)
	}
}

/*
Sets andD column render prop as appropriate render function
depending on data type and format. Render function takes
data value as input and returns a custom formatted value(
can be a string or React Element).
*/
function applyRender<DataTypeType, DataFormatType, DataType>(
	type: DataTypeType,
	format: DataFormatType,
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	const typeStr = String(type),
		formatStr = String(format)

	if (typeStr === 'number') {
		switch (formatStr) {
			case 'byte':
				antDColumn.render = number => bytes(number)
				break

			case 'date': {
				antDColumn.render = createDateFormatter(column)
				break
			}
		}
	} else if (typeStr === 'component') {
		switch (formatStr) {
			case 'icon':
				antDColumn.render = (props: IconProps) => <Icon {...props} />
				break

			case 'link':
				antDColumn.render = (props: LinkProps) => <Link {...props} />
				break

			case 'tag':
				antDColumn.render = (props: TagProps) => <Tag {...props} />
				break

			case 'toggle':
				antDColumn.render = (props: ToggleProps) => (
					<Toggle {...props} />
				)
				break
		}
	}
}

/* -o-o-o-o-o- Helpers for parsing data -o-o-o-o-o- */

/*
Creates array of formatted data so that rows can be
searched and filtered by formatted data.
*/
function createFormattedData<DataType>(
	mappedFormat: Record<string, FormatterFnType>,
	item: DataType
) {
	const FORMATTED_DATA = []

	for (const key of Object.keys(item)) {
		if (key in mappedFormat)
			// @ts-ignore
			FORMATTED_DATA.push(mappedFormat[key](item[key]))
	}

	return FORMATTED_DATA
}

/* Maps dataIndex to formatter function. E.g. { dateOfBirth: DATE_FORMATTER_FN } */
function mapDataIndexToFormatter(columns: ColumnType[]) {
	const mapped: Record<string, FormatterFnType> = {}

	for (const column of columns) {
		const { dataIndex, type, format } = column
		if (type === 'number') {
			switch (format) {
				case 'byte':
					mapped[dataIndex] = (num: number) => bytes(num)
					break

				case 'date': {
					mapped[dataIndex] = createDateFormatter(column)
					break
				}
			}
		}
	}

	return mapped
}

/* ------- Common Helper functions ------- */

/* Returns a date formatter function (using moment.js). */
function createDateFormatter(column: ColumnType): FormatterFnType {
	let displayFormat: string | undefined = ''

	if ('displayFormat' in column) displayFormat = column.displayFormat

	return (num: number) => moment(num).format(displayFormat)
}

/* ------- Extracted Types ------- */
type FormatterFnType = (num: number) => string

/* ------- Exported Functions ------- */

/* Takes columns prop passed to Table and returns columns
formatted it to satisfy antD requirements. */
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

/*
Takes data prop passed to Table and returns data:
  1. formatted to satisfy antD requirements
  2. with an added FORMATTED_DATA key and array of formatted data value
    (this makes rows searchable by formatted data).
  */
export function processData<DataType>(data: DataType[], columns: ColumnType[]) {
	const processedData: DataType[] = []
	const mappedFormat = mapDataIndexToFormatter(columns)
	let i: Key = 0

	for (const item of data) {
		const FORMATTED_DATA = createFormattedData(mappedFormat, item)

		const row = {
			...item,
			FORMATTED_DATA,
			key: i++
		}

		processedData.push(row)
	}

	return processedData
}

/*
Maps keys from columns - the values of which should be searched or filtered on.
This will be used for "global" search using fuse.
More info --> https://fusejs.io/examples.html#nested-search
 */
export function mapFilterKeys(columns: ColumnType[]) {
	const keysArr: (string | string[])[] = ['FORMATTED_DATA']

	for (const column of columns) {
		const { dataIndex, format, type } = column

		if (type === 'component') {
			switch (format) {
				case 'tag':
					keysArr.push([dataIndex, 'children'])
					break

				case 'link':
					keysArr.push([dataIndex, 'children'])
					break

				case 'icon':
					keysArr.push([dataIndex, 'icon'], [dataIndex, 'iconKey'])
					break
			}
		} else if (type === 'string') {
			keysArr.push(dataIndex)
		} else if (type === 'number') {
			keysArr.push(dataIndex)
		}
	}

	return keysArr
}
