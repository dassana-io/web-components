import { ColumnType as AntDColumnType } from 'antd/es/table'
import { ColumnType } from '.'
import { Key } from 'react'

function sortStringCompare(column: ColumnType) {
	return (a: any, b: any) =>
		a[column.dataIndex].localeCompare(b[column.dataIndex])
}

function sortNumberCompare(column: ColumnType) {
	return (a: any, b: any) => a[column.dataIndex] - b[column.dataIndex]
}

export function processData<DataType>(data: DataType[]) {
	const processedData: DataType[] = []
	let i: Key = 0

	for (const item of data) {
		const row = {
			...item,
			key: i++
		}
		processedData.push(row)
	}
	return processedData
}

export function processColumns<DataType>(columns: ColumnType[]) {
	const processedColumns: AntDColumnType<DataType>[] = []

	for (const column of columns) {
		const { dataIndex, title, sort, type } = column
		const antDColumn: AntDColumnType<DataType> = {
			dataIndex,
			showSorterTooltip: false,
			title
		}

		if (sort === undefined || sort) {
			if (type === 'string') antDColumn.sorter = sortStringCompare(column)
			if (type === 'number') antDColumn.sorter = sortNumberCompare(column)
		}

		processedColumns.push(antDColumn)
	}

	return processedColumns
}
