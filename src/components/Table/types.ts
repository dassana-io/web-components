import { ColoredDotProps } from 'components/ColoredDot'
import { Key } from 'react'
import { SharedIconProps } from '../Icon'
import { SharedLinkProps } from '../Link'

export enum ColumnTypes {
	string = 'string',
	number = 'number',
	component = 'component'
}

export enum ColumnFormats {
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
	title: string
	sort?: boolean
}

interface CommonEditableCellConfig {
	type: EditableCellTypes
	onSave: (
		record: Record<string, string>,
		editedData: Record<string, string>
	) => Promise<void>
}

interface EditableInputConfig extends CommonEditableCellConfig {
	type: EditableCellTypes.input
}
interface EditableSelectConfig extends CommonEditableCellConfig {
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

interface ComponentToggleType extends PartialComponentType {
	format: ColumnFormats.toggle
}

type ComponentType =
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
