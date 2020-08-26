interface ColumnPartialType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

interface DefaultNumberType extends ColumnPartialType {
	type: 'number'
	format?: 'none'
}

interface NumberDataType extends Omit<DefaultNumberType, 'format'> {
	format?: 'byte'
}

interface NumberDateType extends Omit<DefaultNumberType, 'format'> {
	format?: 'date'
	displayFormat?: string
}

export type NumberType = DefaultNumberType | NumberDataType | NumberDateType

export interface StringType extends ColumnPartialType {
	type: 'string'
	format?: 'none'
}

export interface ComponentType extends ColumnPartialType {
	type: 'component'
	format: 'icon' | 'link' | 'tag' | 'toggle'
}

export type ColumnType = StringType | NumberType | ComponentType

export interface TableProps<DataType> {
	data: DataType[]
	columns: ColumnType[]
}
