import { ColumnType, ColumnTypes, TableProps } from '../.'

export interface Person {
	name: string[]
	id: number | string
	age: number
}

const { number, string } = ColumnTypes

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: string
	},
	{
		dataIndex: 'age',
		title: 'Age',
		type: number
	}
]

const data: Person[] = [
	{
		age: 36,
		id: 0,
		name: ['Lorem', 'Ipsum']
	},
	{
		age: 32,
		id: 1,
		name: ['Ipsum']
	},
	{
		age: 45,
		id: 2,
		name: ['Amet']
	},
	{
		age: 50,
		id: 3,
		name: ['Elit']
	},
	{
		age: 22,
		id: 4,
		name: ['Dolor']
	}
]

const tableData0: TableProps<Person> = { columns, data }

export default tableData0
