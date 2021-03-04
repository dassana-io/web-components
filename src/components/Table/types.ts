import { ColoredDotProps } from '../ColoredDot'
import { SharedIconProps } from '../Icon'
import { SharedLinkProps } from '../Link'
import { TableMethods } from './utils'
import { Key, ReactNode } from 'react'

export enum ColumnTypes {
	string = 'string',
	number = 'number',
	component = 'component'
}

export enum ColumnFormats {
	action = 'action',
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
	 * Whether to truncate text width ellipsis and show a tooltip on hover. Makes the table column fixed width (can be customized by providing a width). Currently only works with string type
	 */
	ellipsis?: boolean
	title: string
	sort?: boolean
	width?: number
}

interface CommonEditableCellConfig {
	onSave: <T>(record: T, editedData: T) => Promise<void>
}

interface EditableInputConfig extends CommonEditableCellConfig {
	options?: never
	type: EditableCellTypes.input
}

interface EditableSelectConfig extends CommonEditableCellConfig {
	options: string[]
	type: EditableCellTypes.select
}

type EditableCellConfig = EditableInputConfig | EditableSelectConfig

interface StringType extends PartialColumnType {
	type: ColumnTypes.string
	editConfig?: EditableCellConfig
	format?: ColumnFormats.none
}

interface NumberDefaultType extends PartialColumnType {
	type: ColumnTypes.number
	format?: ColumnFormats.none
}

interface NumberByteType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.byte
}

export enum DateDisplayFormat {
	fromNow = 'fromNow'
}

export interface NumberDateType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.date
	renderProps?: { displayFormat: string | DateDisplayFormat }
}

type NumberType = NumberDefaultType | NumberByteType | NumberDateType

interface PartialComponentType extends PartialColumnType {
	type: ColumnTypes.component
}

interface RenderPropsIcon extends SharedIconProps {
	type: 'icon'
	iconMap: {
		[key: string]: string
	}
}

interface RenderPropsIconKey extends SharedIconProps {
	type: 'iconKey'
}

export interface ComponentActionType extends PartialComponentType {
	dataIndex: ''
	format: ColumnFormats.action
	renderProps: {
		getCmp: <T>(
			rowData: T,
			tableMethods: TableMethods<TableData<T>>
		) => ReactNode
	}
	title: ''
}

interface ComponentIconType extends PartialComponentType {
	format: ColumnFormats.icon
	renderProps: RenderPropsIcon | RenderPropsIconKey
}

interface ComponentColoredDotType extends PartialComponentType {
	format: ColumnFormats.coloredDot
	renderProps: {
		colorMap: Record<string, ColoredDotProps | null>
	}
}

interface RenderPropsLink extends Pick<SharedLinkProps, 'target'> {
	buildHref: (record?: string) => string
}

interface ComponentLinkType extends PartialComponentType {
	format: ColumnFormats.link
	renderProps?: RenderPropsLink
}

interface ComponentTagType extends PartialComponentType {
	format: ColumnFormats.tag
}

interface RenderPropsToggle {
	onSave: (checked: boolean) => Promise<void>
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
	id: Key
}

export type TableData<Data> = Data & DataId
