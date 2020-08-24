import { IconProps } from '../Icon'
import { LinkProps } from '../Link'
import { TagProps } from '../Tag'
import { ToggleProps } from '../Toggle'

interface ColumnPartialType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface StringType extends ColumnPartialType {
	type: 'string'
	format?: 'none'
}

interface NumberType extends ColumnPartialType {
	type: 'number'
	format?: 'none' | 'date' | 'byte'
}

interface ComponentType extends ColumnPartialType {
	type: 'component'
	format: 'icon' | 'link' | 'tag' | 'toggle'
}

export type ColumnType = StringType | NumberType | ComponentType

export interface TableProps<DataType> {
	data: DataType[]
	columns: ColumnType[]
}

export interface FormatType {
	icon: IconProps
	link: LinkProps
	tag: TagProps
	toggle: ToggleProps
}

export type { IconProps, LinkProps, TagProps, ToggleProps }

export { default as Icon } from '../Icon'
export { default as Link } from '../Link'
export { default as Tag } from '../Tag'
export { default as Toggle } from '../Toggle'
