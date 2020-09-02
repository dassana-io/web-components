import { SharedIconProps } from '../Icon'
import { SharedLinkProps } from '../Link'

interface PartialColumnType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

export interface DefaultNumberType extends PartialColumnType {
	type: 'number'
	format?: 'none'
}

export interface NumberByteType extends Omit<DefaultNumberType, 'format'> {
	format: 'byte'
}

export interface NumberDateType extends Omit<DefaultNumberType, 'format'> {
	format: 'date'
	renderProps?: {
		displayFormat?: string
	}
}

export type NumberType = DefaultNumberType | NumberByteType | NumberDateType

export interface StringType extends PartialColumnType {
	type: 'string'
	format?: 'none'
}

interface PartialComponentType extends PartialColumnType {
	type: 'component'
}

export interface RenderPropsIcon extends SharedIconProps {
	type: 'icon'
	iconMap: {
		[key: string]: string
	}
}

interface RenderPropsIconKey extends SharedIconProps {
	type: 'iconKey'
}

export interface IconType extends PartialComponentType {
	format: 'icon'
	renderProps: RenderPropsIcon | RenderPropsIconKey
}

interface RenderPropsLink extends Pick<SharedLinkProps, 'target'> {
	buildHref: (record: string) => string
}

export interface LinkType extends PartialComponentType {
	format: 'link'
	renderProps?: RenderPropsLink
}

export interface TagType extends PartialComponentType {
	format: 'tag'
}

export interface ToggleType extends PartialComponentType {
	format: 'toggle'
}

type ComponentType = IconType | LinkType | TagType | ToggleType

export type ColumnType = StringType | NumberType | ComponentType

export type ParentDataType = Record<string, any>
