import { ColumnType as AntDColumnType } from 'antd/es/table'
import castArray from 'lodash/castArray'
import { CellWithTooltip } from './CellWithTooltip'
import { ColoredDot } from 'components/ColoredDot'
import { EditableCell } from './EditableCell'
import { faFilter } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconCell } from './IconCell'
import isUndefined from 'lodash/isUndefined'
import moment from 'moment'
import { MultipleIcons } from './MultipleIcons'
import { SelectOption } from 'components/Select'
import { v4 as uuidV4 } from 'uuid'
import {
	ColumnFormats,
	ColumnType,
	ColumnTypes,
	ComponentActionType,
	ComponentIconType,
	ComponentTagType,
	DataId,
	DateDisplayFormat,
	EditableCellTypes,
	FormattedTag,
	NumberDateType,
	RequiredDataId
} from './types'
import { formatBytes, formatCurrency } from '@dassana-io/web-utils'
import { getJSONPathArr, getJSONPathValue } from 'components/utils'
import { IconName, IconProps } from '../Icon'
import { Link, LinkProps } from '../Link'
import React, { Key, MouseEvent, ReactNode } from 'react'
import { Tag, TagProps } from '../Tag'
import { Toggle, ToggleProps } from '../Toggle'

const { component, number, string } = ColumnTypes
const {
	action,
	boolean,
	byte,
	currency,
	custom,
	date,
	icon,
	coloredDot,
	link,
	tag,
	toggle
} = ColumnFormats

/* ------- Exported Functions ------- */

interface MappedData<TableData> {
	[id: string]: TableData & RequiredDataId
}

export interface TableMethods<T> {
	deleteRow: (rowId: Key) => void
	updateRowData: (rowId: Key, updatedData: T) => void
}

/* Takes columns prop passed to Table and returns columns
formatted to satisfy antD requirements. */
export function processColumns<TableData extends DataId>(
	columns: ColumnType[],
	tableMethods: TableMethods<TableData & RequiredDataId>
) {
	return columns.map(column => {
		const {
			dataIndex,
			filterConfig = {},
			title,
			sort = true,
			width
		} = column

		const antDColumn: AntDColumnType<TableData & RequiredDataId> = {
			dataIndex,
			filterIcon: <FontAwesomeIcon icon={faFilter} />,
			showSorterTooltip: false,
			title,
			width,
			...filterConfig
		}

		applyRender<TableData & RequiredDataId>(
			column,
			antDColumn,
			tableMethods
		)

		if (sort) {
			applySort<TableData & RequiredDataId>(column, antDColumn)
		}

		return antDColumn
	})
}

// ------------------------------------------------

type ProcessedDataType<T> = T & {
	_FORMATTED_DATA: (string | null)[]
	id: Key
	key: Key
}

interface ProcessedData<T> {
	mappedData: MappedData<T>
	processedData: ProcessedDataType<T>[]
}

/*
	Takes data prop passed to Table and returns data:
		1. formatted to satisfy antD requirements
		2. with an added _FORMATTED_DATA key and array of formatted data value
			(this makes rows searchable by formatted data).
*/
export function processData<TableData extends DataId>(
	data: TableData[],
	columns: ColumnType[],
	rowIdKey = 'id'
): ProcessedData<TableData> {
	const mappedData: MappedData<TableData> = {}
	const processedData: ProcessedDataType<TableData & DataId>[] = []

	const mappedFormat = mapDataIndexToFormatter(columns)

	data.forEach(item => {
		const id = item[rowIdKey] ?? uuidV4()

		mappedData[id] = { ...item, id }

		const partialData: ProcessedDataType<TableData> = {
			id,
			key: id
		} as ProcessedDataType<TableData>

		columns.forEach(col => {
			const { dataIndex, formatKey } = col

			const value = getJSONPathValue(
				`$.${dataIndex}`,
				item,
				formatKey
			) as ProcessedDataType<TableData>[keyof TableData]

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

		processedData.push({
			...partialData,
			_FORMATTED_DATA: createFormattedData(mappedFormat, partialData)
		})
	})

	return {
		mappedData,
		processedData
	}
}

/*
	Maps keys from columns - the values of which should be searched or filtered on.
	This will be used for "global" search using fuse.
	More info --> https://fusejs.io/examples.html#nested-search
*/
export function mapFilterKeys(columns: ColumnType[]) {
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
						keysArr.push(dataIndex)
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
			formatKey,
			renderProps: { iconKey }
		} = column

		const jsonPath = iconKey
			? `$.${dataIndex}.${iconKey}`
			: `$.${dataIndex}`

		const compareValA =
			getJSONPathValue(jsonPath, a, formatKey)?.toString() || ''

		const compareValB =
			getJSONPathValue(jsonPath, b, formatKey)?.toString() || ''

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
		let valA = a[column.dataIndex] || ''
		let valB = b[column.dataIndex] || ''

		if (Array.isArray(valA)) valA = valA.join(', ')
		if (Array.isArray(valB)) valB = valB.join(', ')

		if (valA.name) {
			valA = valA.name
		}
		if (valB.name) {
			valB = valB.name
		}

		return valA.localeCompare(valB)
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
function applySort<TableData>(
	column: ColumnType,
	antDColumn: AntDColumnType<TableData & RequiredDataId>
) {
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
					icon: buildHref(val, data as Record<string, any>)
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

const formatSelectOptions = (options: string[]) =>
	options.map(option => ({ text: option, value: option } as SelectOption))

/*
Sets antD column render prop as appropriate render function
depending on data type and format. Render function takes
data value as input and returns a custom formatted value(
can be a string or React Element).
*/
function applyRender<TableData extends RequiredDataId>(
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
				const { contentFormatter, onSave, type } = editConfig

				const commonProps = {
					contentFormatter,
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
						const {
							formatOptions,
							matchSelectedContentWidth,
							options = []
						} = editConfig

						const selectOptions = isUndefined(formatOptions)
							? formatSelectOptions(options as string[])
							: (options as SelectOption[])

						antDColumn.render = (
							record: string,
							rowData: TableData
						) => (
							<EditableCell<TableData>
								{...commonProps}
								matchSelectedContentWidth={
									matchSelectedContentWidth
								}
								options={selectOptions}
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
				case action:
				case custom: {
					antDColumn.render = (_, rowData: TableData) => {
						const { getCmp, preventClickPropagation = true } =
							column.renderProps

						return (
							<div
								onClick={(e: MouseEvent) =>
									preventClickPropagation &&
									e.stopPropagation()
								}
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
						name: ReactNode
						color?: string
					}) => {
						if (record === undefined) return ''

						const { deletable = false, tagFormatter } =
							column.renderProps || {}

						return castArray(record).map((tagInfo, i) => {
							if (tagFormatter) tagInfo = tagFormatter(tagInfo)

							const { color = '', name } = tagInfo as FormattedTag
							/* Note: If BE doesn't send exactly { color: 'blue', name: 'CEO' } as data,
				  this will break. */
							const tagProps: TagProps = {
								children: name,
								color,
								deletable
							}

							return <Tag key={i} {...tagProps} />
						})
					}
					break
				}

				case toggle: {
					antDColumn.render = (
						record: boolean,
						rowData: TableData & RequiredDataId
					) => {
						if (record === undefined) return ''

						const { onSave } = column.renderProps

						const toggleProps: ToggleProps = {
							checked: record,
							onChange: async (checked: boolean) => {
								await onSave(checked, rowData)

								updateRowData(rowData.id, {
									[column.dataIndex]: checked
								} as TableData)
							},
							size: 'small'
						}

						return (
							<div onClick={e => e.stopPropagation()}>
								<Toggle {...toggleProps} />
							</div>
						)
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

				case currency:
					antDColumn.render = createCurrencyFormatter()
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

	const mapped: Record<string, NumFormatterFunction> = {}

	for (const column of columns) {
		const { dataIndex } = column

		switch (column.type) {
			case number:
				switch (column.format) {
					case byte:
						mapped[dataIndex] = createByteFormatter()
						break

					case currency:
						mapped[dataIndex] = createCurrencyFormatter()
						break

					case date: {
						mapped[dataIndex] = createDateFormatter(column)
						break
					}
				}
				break
			case component:
				switch (column.format) {
					case tag:
						mapped[dataIndex] = createTagFormatter(column)
						break
				}
		}
	}

	return mapped
}

/* ------- Common Helper functions ------- */

/* Returns a date formatter function (using moment.js). */
export function createDateFormatter(
	column: NumberDateType
): NumFormatterFunction {
	const { renderProps: { displayFormat, formatter } = {} } = column

	let dateFormatter = (num: number) => moment(num).format(displayFormat)

	if (displayFormat && displayFormat === DateDisplayFormat.fromNow) {
		dateFormatter = (num: number) => moment(num).fromNow()
	}

	if (formatter) dateFormatter = formatter

	return (num?: number) => (num === undefined ? null : dateFormatter(num))
}

/* Returns a byte formatter function (using bytes). */
export function createByteFormatter(): NumFormatterFunction {
	return (num?: number) =>
		num === undefined ? null : formatBytes(num, { unitSeparator: ' ' })
}

export function createCurrencyFormatter(): NumFormatterFunction {
	return (num?: number) => (num === undefined ? null : formatCurrency(num))
}

export const createTagFormatter = (column: ComponentTagType) => {
	const { renderProps: { filterFn } = {} } = column

	return (record?: any) => (filterFn ? filterFn(record) : record)
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
