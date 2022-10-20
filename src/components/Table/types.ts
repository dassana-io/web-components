import { ColumnType as AntDColumnType } from 'antd/es/table'
import { ColoredDotProps } from '../ColoredDot'
import { LinkProps } from '../Link'
import { SelectOption } from 'components/Select'
import { SharedIconProps } from '../Icon'
import { TableMethods } from './utils'
import { ThemeType } from 'components/assets/styles'
import { Key, ReactNode } from 'react'

export enum ColumnTypes {
	string = 'string',
	number = 'number',
	component = 'component'
}

export enum ColumnFormats {
	action = 'action',
	boolean = 'boolean',
	currency = 'currency',
	none = 'none',
	date = 'date',
	byte = 'byte',
	icon = 'icon',
	coloredDot = 'coloredDot',
	link = 'link',
	tag = 'tag',
	toggle = 'toggle'
}

export enum EditableCellTypes {
	input = 'input',
	select = 'select'
}

interface PartialColumnType {
	dataIndex: string
	/**
	 * Whether to truncate text width ellipsis and show a tooltip on hover. Currently only works with string type
	 * @default true
	 */
	ellipsis?: boolean
	formatKey?: (key: string) => string
	title: string
	sort?: boolean
	filterConfig?: {
		filterDropdown?: AntDColumnType<unknown>['filterDropdown']
		filterDropdownVisible?: boolean
		filterIcon?: ReactNode | ((filtered: boolean) => ReactNode)
		onFilter?: AntDColumnType<unknown>['onFilter']
		onFilterDropdownVisibleChange?: (visible: boolean) => void
	}
	width?: number
}

interface CommonEditableCellConfig {
	contentFormatter?: (content: ReactNode) => ReactNode
	onSave: (record: unknown, editedData: unknown) => Promise<void>
}

interface EditableInputConfig extends CommonEditableCellConfig {
	options?: never
	type: EditableCellTypes.input
}

interface CommonEditableSelectConfig extends CommonEditableCellConfig {
	matchSelectedContentWidth?: number
	type: EditableCellTypes.select
}

export interface FormattedOptionsEditableSelectConfig
	extends CommonEditableSelectConfig {
	formatOptions: false
	options: SelectOption[]
}
export interface UnformattedOptionsEditableSelectConfig
	extends CommonEditableSelectConfig {
	formatOptions?: never
	options: string[]
}

type EditableSelectConfig =
	| FormattedOptionsEditableSelectConfig
	| UnformattedOptionsEditableSelectConfig

type EditableCellConfig = EditableInputConfig | EditableSelectConfig

interface StringDefaultType extends PartialColumnType {
	type: ColumnTypes.string
	editConfig?: EditableCellConfig
	format?: ColumnFormats.none
}

interface StringBooleanType extends Omit<StringDefaultType, 'format'> {
	format: ColumnFormats.boolean
}

export type StringType = StringDefaultType | StringBooleanType

interface NumberDefaultType extends PartialColumnType {
	type: ColumnTypes.number
	format?: ColumnFormats.none
}

interface NumberByteType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.byte
}
interface NumberCurrencyType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.currency
}

export enum DateDisplayFormat {
	fromNow = 'fromNow'
}

export interface NumberDateType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.date
	renderProps?: {
		displayFormat?: string | DateDisplayFormat
		formatter?: (date: number) => string
	}
}

type NumberType =
	| NumberDefaultType
	| NumberByteType
	| NumberCurrencyType
	| NumberDateType

interface PartialComponentType extends PartialColumnType {
	type: ColumnTypes.component
}

export enum IconCellLabelType {
	inline = 'inline',
	tooltip = 'tooltip'
}

interface SharedCompIconType extends SharedIconProps {
	filterKey?: string
	iconKey?: string
	/**
	 * Whether to render a label with the icon or not.
	 */
	label?: { labelKey?: string; type: IconCellLabelType }
}

export interface RenderPropsIconMap extends SharedCompIconType {
	type: 'icon'
	iconMap: {
		[key: string]: string
	}
}

export interface RenderPropsIconBuildHref extends SharedCompIconType {
	type: 'icon'
	buildHref: (record?: string, data?: Record<string, any>) => string
}

interface RenderPropsIconKey extends SharedCompIconType {
	type: 'iconKey'
}

interface RenderPropsIconUrl extends SharedCompIconType {
	type: 'iconUrl'
}

export interface ComponentIconType extends PartialComponentType {
	format: ColumnFormats.icon
	renderProps:
		| RenderPropsIconMap
		| RenderPropsIconBuildHref
		| RenderPropsIconKey
		| RenderPropsIconUrl
}

export interface RenderPropsAction {
	getCmp: <T>(
		rowData: T,
		tableMethods: TableMethods<TableData<T>>
	) => ReactNode
}

export interface ComponentActionType extends PartialComponentType {
	dataIndex: ''
	format: ColumnFormats.action
	renderProps: RenderPropsAction
	title: ''
}

interface ComponentColoredDotType extends PartialComponentType {
	format: ColumnFormats.coloredDot
	renderProps: {
		colorMap: Record<string, ColoredDotProps | null>
	}
}

interface RenderPropsLink extends Pick<LinkProps, 'target'> {
	buildHref: (record?: string, data?: Record<string, any>) => string
	isDisabled?: (record?: string, data?: Record<string, any>) => boolean
	sortBy?: ColumnTypes.string | ColumnTypes.number
}

interface ComponentLinkType extends PartialComponentType {
	format: ColumnFormats.link
	renderProps?: RenderPropsLink
}

interface FormattedTag {
	color?: string
	name: ReactNode
}

interface RenderPropsTag {
	deletable?: boolean
	filterFn?: <T>(record: T) => string
	tagFormatter?: <T>(record: T) => FormattedTag
}

export interface ComponentTagType extends PartialComponentType {
	format: ColumnFormats.tag
	renderProps?: RenderPropsTag
}

export interface RenderPropsToggle {
	onSave: (checked: boolean, rowData: unknown) => Promise<void>
}

interface ComponentToggleType extends PartialComponentType {
	format: ColumnFormats.toggle
	renderProps: RenderPropsToggle
}

type ComponentType =
	| ComponentActionType
	| ComponentIconType
	| ComponentColoredDotType
	| ComponentLinkType
	| ComponentTagType
	| ComponentToggleType

export type ColumnType = StringType | NumberType | ComponentType

export interface DataId extends Record<string, any> {
	id?: Key
}

export interface RequiredDataId extends Record<string, any> {
	id: Key
}

export type TableData<Data> = Data & DataId

export type ProcessedTableData<Data> = Data & RequiredDataId

export type AdditionalPaletteColors = Record<ThemeType, any>
