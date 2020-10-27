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
	link = 'link',
	tag = 'tag',
	toggle = 'toggle'
}

interface PartialColumnType {
	dataIndex: string
	title: string
	sort?: boolean
}

interface StringType extends PartialColumnType {
	type: ColumnTypes.string
	format?: ColumnFormats.none
}

interface NumberDefaultType extends PartialColumnType {
	type: ColumnTypes.number
	format?: ColumnFormats.none
}

interface NumberByteType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.byte
}

interface DisplayFromNow {
	displayFromNow?: true
}

interface DisplayFormat {
	displayFormat?: string
}

export interface NumberDateType extends Omit<NumberDefaultType, 'format'> {
	format: ColumnFormats.date
	renderProps?: DisplayFromNow | DisplayFormat
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
	| ComponentLinkType
	| ComponentTagType
	| ComponentToggleType

export type ColumnType = StringType | NumberType | ComponentType

export interface ParentDataType extends Record<string, any> {
	id?: Key
}

export enum ProcessedDataKeys {
	_FORMATTED_DATA = '_FORMATTED_DATA',
	key = 'key'
}
