import { ColumnType as AntDColumnType } from 'antd/es/table'
import bytes from 'bytes'
import moment from 'moment'
import React from 'react'
import {
	ColumnFormats,
	ColumnType,
	ColumnTypes,
	NumberDateType,
	ParentDataType
} from '.'
import Icon, { IconName, IconProps } from '../Icon'
import Link, { LinkProps } from '../Link'
import Tag, { TagProps } from '../Tag'
import Toggle, { ToggleProps } from '../Toggle'

/* ------- Exported Functions ------- */

/* Takes columns prop passed to Table and returns columns
formatted to satisfy antD requirements. */
export function processColumns<DataType extends ParentDataType>(
	columns: ColumnType[]
) {
	return columns.map(column => {
		const { dataIndex, title, sort = true } = column
		const antDColumn: AntDColumnType<DataType> = {
			dataIndex,
			showSorterTooltip: false,
			title
		}

		applyRender<DataType>(column, antDColumn)

		if (sort) {
			applySort<DataType>(column, antDColumn)
		}

		return antDColumn
	})
}

/*
Takes data prop passed to Table and returns data:
  1. formatted to satisfy antD requirements
  2. with an added _FORMATTED_DATA key and array of formatted data value
    (this makes rows searchable by formatted data).
  */
export function processData<DataType extends ParentDataType>(
	data: DataType[],
	columns: ColumnType[]
) {
	const mappedFormat = mapDataIndexToFormatter(columns)

	return data.map((item, i) => ({
		...item,
		_FORMATTED_DATA: createFormattedData(mappedFormat, item),
		key: item.ID ? item.ID : i
	}))
}

/*
Maps keys from columns - the values of which should be searched or filtered on.
This will be used for "global" search using fuse.
More info --> https://fusejs.io/examples.html#nested-search
 */
export function mapFilterKeys(columns: ColumnType[]) {
	const { component, number, string } = ColumnTypes
	const { icon, link, tag } = ColumnFormats

	const keysArr: (string | string[])[] = ['_FORMATTED_DATA']

	for (const column of columns) {
		const { dataIndex } = column

		switch (column.type) {
			case component:
				switch (column.format) {
					case icon:
						keysArr.push(dataIndex)
						break

					case link:
						keysArr.push(dataIndex)
						break

					case tag:
						keysArr.push([dataIndex, 'name'])
						break
				}
				break

			case number:
				keysArr.push(dataIndex)
				break

			case string:
				keysArr.push(dataIndex)
				break
		}
	}

	return keysArr
}

/* -*-*-*-*-*- Helpers for parsing columns -*-*-*-*-*- */

/* 
  Compare functions used by applySort to pass a custom sorter
  based on data type and format.
 */
function compareStrings(column: ColumnType) {
	return (a: ParentDataType, b: ParentDataType) => {
		const compareValA: string =
			a[column.dataIndex] === undefined ? '' : a[column.dataIndex]
		const compareValB: string =
			b[column.dataIndex] === undefined ? '' : b[column.dataIndex]

		return compareValA.localeCompare(compareValB)
	}
}

function compareNumbers(column: ColumnType) {
	return (a: ParentDataType, b: ParentDataType) => {
		const compareValA: number =
			a[column.dataIndex] === undefined ? -Infinity : a[column.dataIndex]
		const compareValB: number =
			b[column.dataIndex] === undefined ? -Infinity : b[column.dataIndex]

		return compareValA - compareValB
	}
}

function compareTags(column: ColumnType) {
	return (a: ParentDataType, b: ParentDataType) => {
		const compareValA: string =
			a[column.dataIndex] === undefined ? '' : a[column.dataIndex]['name']
		const compareValB: string =
			b[column.dataIndex] === undefined ? '' : b[column.dataIndex]['name']

		return compareValA.localeCompare(compareValB)
	}
}

function compareBooleans(column: ColumnType) {
	return (a: ParentDataType, b: ParentDataType) => {
		const compareValA: number =
			a[column.dataIndex] === undefined ? -1 : +a[column.dataIndex]
		const compareValB: number =
			b[column.dataIndex] === undefined ? -1 : +b[column.dataIndex]
		return compareValA - compareValB
	}
}

/* Sets antD column sorter prop as appropriate compare function. */
function applySort<DataType>(
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	const { component, number, string } = ColumnTypes
	const { icon, link, tag, toggle } = ColumnFormats

	switch (column.type) {
		case component:
			switch (column.format) {
				case icon:
					antDColumn.sorter = compareStrings(column)
					break

				case link:
					antDColumn.sorter = compareStrings(column)
					break

				case tag:
					antDColumn.sorter = compareTags(column)
					break

				case toggle:
					antDColumn.sorter = compareBooleans(column)
					break
			}
			break

		case number:
			antDColumn.sorter = compareNumbers(column)
			break

		case string:
			antDColumn.sorter = compareStrings(column)
			break
	}
}

/*
Sets antD column render prop as appropriate render function
depending on data type and format. Render function takes
data value as input and returns a custom formatted value(
can be a string or React Element).
*/
function applyRender<DataType>(
	column: ColumnType,
	antDColumn: AntDColumnType<DataType>
) {
	const { component, number } = ColumnTypes
	const { byte, date, icon, link, tag, toggle } = ColumnFormats

	switch (column.type) {
		case component:
			switch (column.format) {
				case icon: {
					antDColumn.render = (record: IconName | string) => {
						if (record === undefined) return ''

						const iconColumn = column
						const renderProps = iconColumn.renderProps
						const { height = 25 } = renderProps

						const iconProps: IconProps =
							renderProps.type === 'icon'
								? { icon: renderProps.iconMap[record] }
								: { iconKey: record as IconName }

						if (renderProps.type === 'icon' && !iconProps.icon)
							return record
						/* Custom icons are defined as a map of key and url in the Column object.
              E.g. { renderProps: {iconMap: { example-icon: 'https://dummyimage.com/600x400/0072c6/fff&text=A' }, ...}, ...}
              Then in the data object, you reference the iconMap key - 'example-icon'.
              E.g. { demo_icon: 'example-icon', ... }
              If this mapping doesn't exist in the column object, the table renders just the key (or record).
              In this example, it will be 'example-icon'.
            */

						return <Icon {...iconProps} height={height} />
					}
					break
				}

				case link: {
					antDColumn.render = (record: string) => {
						if (record === undefined) return ''

						const linkColumn = column
						const {
							target = '_blank',
							buildHref = (r: string) => r
						} = linkColumn.renderProps || {}

						const linkProps: LinkProps = {
							children: record,
							href: buildHref(record),
							target
						}

						return <Link {...linkProps} />
					}
					break
				}

				case tag: {
					antDColumn.render = (record: {
						name: string
						color?: string
					}) => {
						if (record === undefined) return ''

						const { color = '' } = record
						const tagProps: TagProps = {
							children: record.name,
							color
						}

						return <Tag {...tagProps} />
					}
					break
				}

				case toggle: {
					antDColumn.render = (record: boolean) => {
						if (record === undefined) return ''

						const checked = record
						const toggleProps: ToggleProps = {
							checked,
							// TODO: Extract out onChange to be passed in data
							onChange: checked => {
								console.log(`switch to ${checked}`)
							},
							size: 'small'
						}

						return <Toggle {...toggleProps} />
					}
					break
				}
			}
			break

		case number:
			switch (column.format) {
				case byte:
					antDColumn.render = createByteFormatter()
					break

				case date: {
					antDColumn.render = createDateFormatter(column)
					break
				}
			}
			break
	}
}

/* -o-o-o-o-o- Helpers for parsing data -o-o-o-o-o- */

/*
Creates array of formatted data so that rows can be
searched and filtered by formatted data.
*/
function createFormattedData<DataType>(
	mappedFormat: Record<string, NumFormatterFunction>,
	item: DataType
) {
	// @ts-ignore
	return Object.keys(mappedFormat).map(key => mappedFormat[key](item[key]))
}

/* Maps dataIndex to formatter function. E.g. { dateOfBirth: DATE_FORMATTER_FN } */
function mapDataIndexToFormatter(columns: ColumnType[]) {
	const { number } = ColumnTypes
	const { byte, date } = ColumnFormats

	const mapped: Record<string, NumFormatterFunction> = {}

	for (const column of columns) {
		const { dataIndex } = column

		switch (column.type) {
			case number:
				switch (column.format) {
					case byte:
						mapped[dataIndex] = createByteFormatter()
						break

					case date: {
						mapped[dataIndex] = createDateFormatter(column)
						break
					}
				}
				break
		}
	}

	return mapped
}

/* ------- Common Helper functions ------- */

/* Returns a date formatter function (using moment.js). */
export function createDateFormatter(
	column: NumberDateType
): NumFormatterFunction {
	let displayFormat = ''
	const { renderProps } = column

	if (renderProps && renderProps.displayFormat)
		displayFormat = renderProps.displayFormat

	return (num?: number) =>
		num === undefined ? null : moment(num).format(displayFormat)
}

/* Returns a byte formatter function (using bytes). */
export function createByteFormatter(): NumFormatterFunction {
	return (num?: number) => (num === undefined ? null : bytes(num))
}

/* ------- Extracted Types ------- */
type NumFormatterFunction = (num?: number) => string | null

/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x */
