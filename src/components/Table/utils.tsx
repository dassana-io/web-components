import { ColumnType as AntDColumnType } from 'antd/es/table'
import bytes from 'bytes'
import { CellWithTooltip } from './CellWithTooltip'
import { ColoredDot } from 'components/ColoredDot'
import { EditableCell } from './EditableCell'
import { IconCell } from './IconCell'
import isUndefined from 'lodash/isUndefined'
import moment from 'moment'
import { MultipleIcons } from './MultipleIcons'
import {
	ColumnFormats,
	ColumnType,
	ColumnTypes,
	ComponentActionType,
	ComponentIconType,
	DataId,
	DateDisplayFormat,
	EditableCellTypes,
	NumberDateType
} from './types'
import { getJSONPathArr, getJSONPathValue } from 'components/utils'
import { IconName, IconProps } from '../Icon'
import { Link, LinkProps } from '../Link'
import React, { Key, MouseEvent } from 'react'
import { Tag, TagProps } from '../Tag'
import { Toggle, ToggleProps } from '../Toggle'

const { component, number, string } = ColumnTypes
const { action, boolean, byte, date, icon, coloredDot, link, tag, toggle } =
	ColumnFormats

/* ------- Exported Functions ------- */

interface MappedData<TableData> {
	[id: string]: TableData
}

export const mapData = <TableData extends DataId>(data: TableData[]) => {
	const mappedData: MappedData<TableData> = {}

	for (const item of data) {
		mappedData[item.id] = item
	}

	return mappedData
}

export interface TableMethods<T> {
	deleteRow: (rowId: Key) => void
	updateRowData: (rowId: Key, updatedData: T) => void
}

/* Takes columns prop passed to Table and returns columns
formatted to satisfy antD requirements. */
export function processColumns<TableData extends DataId>(
	columns: ColumnType[],
	tableMethods: TableMethods<TableData>
) {
	return columns.map(column => {
		const { dataIndex, title, sort = true } = column

		const antDColumn: AntDColumnType<TableData> = {
			dataIndex,
			showSorterTooltip: false,
			title
		}

		applyRender<TableData>(column, antDColumn, tableMethods)

		if (sort) {
			applySort<TableData>(column, antDColumn)
		}

		return antDColumn
	})
}

// ------------------------------------------------

type ProcessedData<T> = T & {
	_FORMATTED_DATA: (string | null)[]
	key: Key
}

/*
Takes data prop passed to Table and returns data:
  1. formatted to satisfy antD requirements
  2. with an added _FORMATTED_DATA key and array of formatted data value
    (this makes rows searchable by formatted data).
  */
export function processData<TableData extends DataId>(
	data: TableData[],
	columns: ColumnType[]
): ProcessedData<TableData>[] {
	const mappedFormat = mapDataIndexToFormatter(columns)

	return data.map(item => {
		const partialData: ProcessedData<TableData> = {
			id: item.id,
			key: item.id
		} as ProcessedData<TableData>

		columns.forEach(col => {
			const { dataIndex } = col

			const value = getJSONPathValue(
				`$.${dataIndex}`,
				item
			) as ProcessedData<TableData>[keyof TableData]

			if (!isUndefined(value)) {
				partialData[dataIndex as keyof TableData] = value
			}

			const pathArr: string[] = getJSONPathArr(`$.${dataIndex}`)
			// Fix for this issue https://github.com/JSONPath-Plus/JSONPath/issues/102
			if (pathArr[0] === '$') pathArr.shift()

			if (pathArr.length) {
				partialData[pathArr[0] as keyof TableData] = item[pathArr[0]]
			}
		})

		return {
			...partialData,
			_FORMATTED_DATA: createFormattedData(mappedFormat, partialData)
		}
	})
}

/*
Maps keys from columns - the values of which should be searched or filtered on.
This will be used for "global" search using fuse.
More info --> https://fusejs.io/examples.html#nested-search
 */
export function mapFilterKeys(columns: ColumnType[]) {
	const { component, number, string } = ColumnTypes
	const { icon, coloredDot, link, tag } = ColumnFormats

	const keysArr: (string | string[])[] = ['_FORMATTED_DATA']

	for (const column of columns) {
		const { dataIndex } = column

		switch (column.type) {
			case component:
				switch (column.format) {
					case coloredDot:
					case link:
						keysArr.push(dataIndex)
						break

					case icon: {
						const {
							renderProps: { filterKey, iconKey }
						} = column

						if (iconKey && filterKey) {
							keysArr.push(`${dataIndex}.${filterKey}`)
						} else if (!iconKey) {
							keysArr.push(dataIndex)
						}
						break
					}

					case tag:
						keysArr.push([dataIndex, 'name'])
						break
				}
				break

			case number:
			case string:
				keysArr.push(dataIndex)
				break
		}
	}

	return keysArr
}

/* -*-*-*-*-*- Helpers for parsing columns -*-*-*-*-*- */

const compareIcons =
	(column: ComponentIconType) =>
	(a: Record<string, any>, b: Record<string, any>) => {
		const {
			dataIndex,
			renderProps: { iconKey }
		} = column

		const jsonPath = iconKey
			? `$.${dataIndex}.${iconKey}`
			: `$.${dataIndex}`

		const compareValA = getJSONPathValue(jsonPath, a)?.toString() || ''

		const compareValB = getJSONPathValue(jsonPath, b)?.toString() || ''

		return compareValA.localeCompare(compareValB)
	}

const getStrVal = (value?: string | string[]) => {
	if (!value) return ''

	return Array.isArray(value) ? value.join(', ') : value
}

/* 
  Compare functions used by applySort to pass a custom sorter
  based on data type and format.
 */
function compareStrings(column: ColumnType) {
	return (a: Record<string, any>, b: Record<string, any>) => {
		const valA = getStrVal(a[column.dataIndex])
		const valB = getStrVal(b[column.dataIndex])

		return valA.localeCompare(valB)
	}
}

function compareNumbers(column: ColumnType) {
	return (a: Record<string, any>, b: Record<string, any>) => {
		const valA = a[column.dataIndex]
		const valB = b[column.dataIndex]

		const compareValA: number = isUndefined(valA) ? -Infinity : valA
		const compareValB: number = isUndefined(valB) ? -Infinity : valB

		return compareValA - compareValB
	}
}

function compareTags(column: ColumnType) {
	/* Note: If BE doesn't send exactly { color: 'blue', name: 'CEO' } as data,
	  this will break. */
	return (a: Record<string, any>, b: Record<string, any>) => {
		const valA = a[column.dataIndex]
		const valB = b[column.dataIndex]

		const compareValA: string = isUndefined(valA) ? '' : valA['name']
		const compareValB: string = isUndefined(valB) ? '' : valB['name']

		return compareValA.localeCompare(compareValB)
	}
}

function compareBooleans(column: ColumnType) {
	return (a: Record<string, any>, b: Record<string, any>) => {
		const valA = a[column.dataIndex]
		const valB = b[column.dataIndex]

		const compareValA: number = isUndefined(valA) ? -1 : +valA
		const compareValB: number = isUndefined(valB) ? -1 : +valB

		return compareValA - compareValB
	}
}

/* Sets antD column sorter prop as appropriate compare function. */
function applySort<TableData extends DataId>(
	column: ColumnType,
	antDColumn: AntDColumnType<TableData>
) {
	const { component, number, string } = ColumnTypes
	const { icon, coloredDot, link, tag, toggle } = ColumnFormats

	switch (column.type) {
		case component:
			switch (column.format) {
				case coloredDot:
					antDColumn.sorter = compareStrings(column)
					break

				case icon:
					antDColumn.sorter = compareIcons(column)
					break

				case link: {
					const { renderProps = { sortBy: ColumnTypes.string } } =
						column

					antDColumn.sorter =
						renderProps.sortBy === ColumnTypes.number
							? compareNumbers(column)
							: compareStrings(column)
					break
				}

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
			switch (column.format) {
				case boolean:
					antDColumn.sorter = compareBooleans(column)
					break
				default:
					antDColumn.sorter = compareStrings(column)
					break
			}
	}
}

/* -------- applyRender helper functions for icon -------- */

type IconRecord = IconName | string | Record<string, any>

const getIconOrIconKey = (
	record: IconRecord,
	jsonPath: string
): string | IconName | undefined => {
	if (typeof record === 'object') {
		const value = getJSONPathValue(jsonPath, record)?.toString()

		if (value) return value
	} else return record
}

interface GetIconPropsParams<TableData> {
	data?: TableData
	jsonPath: string
	record: IconRecord
	renderProps: ComponentIconType['renderProps']
}

// eslint-disable-next-line comma-spacing
const getIconProps = <TableData,>({
	data,
	jsonPath,
	record,
	renderProps
}: GetIconPropsParams<TableData>): IconProps => {
	const val = getIconOrIconKey(record, jsonPath)

	if (!val) return {} as IconProps

	switch (renderProps.type) {
		case 'icon': {
			if ('iconMap' in renderProps) {
				const { iconMap } = renderProps

				return { icon: iconMap[val] }
			} else {
				const { buildHref } = renderProps

				return {
					altText: val,
					icon: buildHref(val, data)
				}
			}
		}

		case 'iconUrl':
			return { icon: val }

		case 'iconKey':
			return { iconKey: val as IconName }
	}
}

interface RenderIconProps<TableData> {
	data: TableData
	record: IconRecord
	renderProps: ComponentIconType['renderProps']
}

const defaultIconHeight = 25

// eslint-disable-next-line comma-spacing
const renderIcon = <TableData,>({
	data,
	record,
	renderProps
}: RenderIconProps<TableData>) => {
	const { iconKey, height = defaultIconHeight, label } = renderProps

	const jsonPath = iconKey ? `$.${iconKey}` : ''

	const iconProps = {
		...getIconProps({
			data,
			jsonPath,
			record,
			renderProps
		}),
		height
	}

	if (renderProps.type === 'icon' && !iconProps.icon) return record

	if (!label) return <IconCell iconProps={iconProps} />

	const labelKey =
		!label.labelKey && typeof record === 'string' ? record : label.labelKey

	if (!labelKey) return <IconCell iconProps={iconProps} />
	else {
		const jsonPath = `$.${labelKey}`

		const labelVal =
			typeof record === 'string'
				? labelKey
				: (getJSONPathValue(jsonPath, record) as string) // eslint-disable-line no-mixed-spaces-and-tabs

		return (
			<IconCell
				iconProps={iconProps}
				label={labelVal}
				labelType={label.type}
			/>
		)
	}
}

/* ------------------------------------------------------- */

/*
Sets antD column render prop as appropriate render function
depending on data type and format. Render function takes
data value as input and returns a custom formatted value(
can be a string or React Element).
*/
function applyRender<TableData extends DataId>(
	column: ColumnType,
	antDColumn: AntDColumnType<TableData>,
	tableMethods: TableMethods<TableData>
) {
	const { updateRowData } = tableMethods

	switch (column.type) {
		case string: {
			const { editConfig, ellipsis = true } = column

			if (editConfig) {
				const { input, select } = EditableCellTypes
				const { onSave, type } = editConfig

				const commonProps = {
					dataIndex: column.dataIndex,
					onSave,
					updateRowData
				}

				switch (type) {
					case input:
						antDColumn.render = (
							record: string,
							rowData: TableData
						) => (
							<EditableCell<TableData>
								{...commonProps}
								rowData={rowData}
								type={input}
							>
								{record}
							</EditableCell>
						)
						break

					case select: {
						const { options = [] } = editConfig

						antDColumn.render = (
							record: string,
							rowData: TableData
						) => (
							<EditableCell<TableData>
								{...commonProps}
								options={options}
								rowData={rowData}
								type={select}
							>
								{record}
							</EditableCell>
						)
						break
					}
				}
			} else {
				switch (column.format) {
					case boolean: {
						antDColumn.render = (record: boolean | boolean[]) => (
							<CellWithTooltip
								showTooltip={ellipsis}
								text={
									Array.isArray(record)
										? record.join(', ')
										: stringifyBoolean(record)
								}
							/>
						)
						break
					}

					default: {
						antDColumn.render = (record: string | string[]) => (
							<CellWithTooltip
								showTooltip={ellipsis}
								text={
									Array.isArray(record)
										? record.join(', ')
										: record
								}
							/>
						)
						break
					}
				}
			}

			break
		}

		case component:
			switch (column.format) {
				case action: {
					antDColumn.render = (_, rowData: TableData) => {
						const { getCmp } = column.renderProps

						return (
							<div
								onClick={(e: MouseEvent) => e.stopPropagation()}
							>
								{getCmp<TableData>(rowData, tableMethods)}
							</div>
						)
					}
					break
				}

				case icon: {
					const renderProps = column.renderProps

					const { height = defaultIconHeight } = renderProps

					antDColumn.render = (
						record?: IconRecord | IconRecord[],
						data?: TableData
					) => {
						if (!record) return ''

						if (Array.isArray(record)) {
							return (
								<MultipleIcons
									height={height}
									icons={record.map(icon =>
										renderIcon({
											data,
											record: icon,
											renderProps
										})
									)}
								/>
							)
						} else {
							return renderIcon({ data, record, renderProps })
						}
					}
					break
				}

				case coloredDot: {
					antDColumn.render = (record: string) => {
						const { colorMap } = column.renderProps

						if (!colorMap[record]) return ''

						return <ColoredDot {...colorMap[record]} />
					}
					break
				}

				case link: {
					antDColumn.render = (record: string, data: TableData) => {
						if (record === undefined) return ''

						const {
							buildHref = (r: string, _data: TableData) => r,
							isDisabled = (_r: string, _data: TableData) =>
								false,
							target = '_blank'
						} = column.renderProps || {}

						const linkProps: LinkProps = {
							children: record,
							href: buildHref(record, data),
							onClick: e => e.stopPropagation(),
							target
						}

						if (isDisabled(record, data))
							return <CellWithTooltip text={record} />

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
						/* Note: If BE doesn't send exactly { color: 'blue', name: 'CEO' } as data,
	          this will break. */
						const tagProps: TagProps = {
							children: record.name,
							color
						}

						return <Tag {...tagProps} />
					}
					break
				}

				case toggle: {
					antDColumn.render = (
						record: boolean,
						rowData: TableData
					) => {
						if (record === undefined) return ''
						const { onSave } = column.renderProps

						const toggleProps: ToggleProps = {
							checked: record,
							onChange: async (checked: boolean) => {
								await onSave(checked)

								updateRowData(rowData.id, {
									[column.dataIndex]: checked
								} as TableData)
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
function createFormattedData<TableData extends DataId>(
	mappedFormat: Record<string, NumFormatterFunction>,
	item: TableData
) {
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

	if (renderProps && renderProps.displayFormat) {
		if (renderProps.displayFormat === DateDisplayFormat.fromNow) {
			return (num?: number) =>
				num === undefined ? null : moment(num).fromNow()
		}

		displayFormat = renderProps.displayFormat
	}

	return (num?: number) =>
		num === undefined ? null : moment(num).format(displayFormat)
}

/* Returns a byte formatter function (using bytes). */
export function createByteFormatter(): NumFormatterFunction {
	return (num?: number) => (num === undefined ? null : bytes(num))
}

const stringifyBoolean = (bool?: boolean) =>
	typeof bool === 'boolean' ? String(bool) : bool

/* ------- Extracted Types ------- */
type NumFormatterFunction = (num?: number) => string | null

/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x */

export const PARTIAL_ACTION_COLUMN: Omit<ComponentActionType, 'renderProps'> = {
	dataIndex: '',
	format: ColumnFormats.action,
	title: '',
	type: ColumnTypes.component
}
