export interface ColumnType {
	key: string
	label?: string
}

export type DataType = Record<string, string | number | boolean>

export interface TableHeaderProps {
	columns: ColumnType[]
}

export interface TableBodyProps extends TableHeaderProps {
	data: DataType[]
}

export interface TableProps extends TableBodyProps {
	classes?: string[]
}

export interface MapCellsFunc {
	(columns: ColumnType[], rowI: number, row: DataType): React.ReactNode
}

export interface MapRowsFunc {
	(data: DataType[]): React.ReactNode
}
