import { ColumnType, TableProps } from '../.'

export interface Person {
	name: string
	age: number
}

const data: Person[] = [
	{
		age: 36,
		name: 'Lorem'
	},
	{
		age: 32,
		name: 'Ipsum'
	}
]

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: 'string'
	},
	{
		dataIndex: 'age',
		title: 'Age',
		type: 'number'
	}
]

const tableData0: TableProps<Person> = { columns, data }

export default tableData0
