interface ColumnPartialType {
	dataIndex: string
	title: string // we need to pass a key instead of strings for i18n
	sort?: boolean
}

export interface StringType extends ColumnPartialType {
	type: 'string'
	format?: 'none'
}

export interface NumberType extends ColumnPartialType {
	type: 'number'
	format?: 'none' | 'date' | 'byte'
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
