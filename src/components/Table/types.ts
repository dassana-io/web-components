import { SharedIconProps } from '../Icon'
import { SharedLinkProps } from '../Link'

interface StringType extends PartialColumnType {
	type: 'string'
	format?: 'none'
}

interface NumberDefaultType extends PartialColumnType {
	type: 'number'
	format?: 'none'
}

interface NumberByteType extends Omit<NumberDefaultType, 'format'> {
	format: 'byte'
}

export interface NumberDateType extends Omit<NumberDefaultType, 'format'> {
	format: 'date'
	renderProps?: {
		displayFormat?: string
	}
}

type NumberType = NumberDefaultType | NumberByteType | NumberDateType

interface PartialColumnType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface PartialComponentType extends PartialColumnType {
	type: 'component'
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
	format: 'icon'
	renderProps: RenderPropsIcon | RenderPropsIconKey
}

interface RenderPropsLink extends Pick<SharedLinkProps, 'target'> {
	buildHref: (record?: string) => string
}

interface ComponentLinkType extends PartialComponentType {
	format: 'link'
	renderProps?: RenderPropsLink
}

interface ComponentTagType extends PartialComponentType {
	format: 'tag'
}

interface ComponentToggleType extends PartialComponentType {
	format: 'toggle'
}

type ComponentType =
	| ComponentIconType
	| ComponentLinkType
	| ComponentTagType
	| ComponentToggleType

export type ColumnType = StringType | NumberType | ComponentType

export type ParentDataType = Record<string, any>
