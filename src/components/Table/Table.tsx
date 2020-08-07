import React, { FC, ReactNode } from 'react'
import classnames from 'classnames'
import {
	ColumnType,
	DataType,
	TableHeaderProps,
	TableBodyProps,
	TableProps,
	MapCellsFunc,
	MapRowsFunc
} from './types'

export const TableHeader: FC<TableHeaderProps> = ({
	columns
}: TableHeaderProps) => {
	const mapCells = ({ key, label = '' }: ColumnType): ReactNode => {
		return <th key={key}>{label}</th>
	}

	return (
		<thead>
			<tr>{columns.map(mapCells)}</tr>
		</thead>
	)
}

export const TableBody: FC<TableBodyProps> = ({
	data,
	columns
}: TableBodyProps) => {
	const mapCells: MapCellsFunc = (columns, rowI, row) => {
		return columns.map((col, colI) => {
			const reactKey = `row-${rowI}-key-${colI}`

			return <td key={reactKey}>{row[col.key].toString()}</td>
		})
	}

	const mapRows: MapRowsFunc = data => {
		return data.map((row: DataType, rowI: number) => (
			<tr key={rowI}>{mapCells(columns, rowI, row)}</tr>
		))
	}

	return <tbody>{mapRows(data)}</tbody>
}

const Table: FC<TableProps> = ({ columns, data, classes = [] }: TableProps) => {
	const tableClasses: string = classnames(
		{ ui: true, celled: true, table: true },
		classes
	)

	return (
		<table className={tableClasses}>
			<TableHeader columns={columns} />
			<TableBody data={data} columns={columns} />
		</table>
	)
}

export default Table
