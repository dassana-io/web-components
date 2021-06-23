import { ColumnType, ColumnTypes, TableProps } from '../.'

export interface Person {
	name: string
	id: number | string
	age: number
	description: string[]
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
	},
	{
		dataIndex: 'description',
		title: 'Description',
		type: string
	}
]

const data: Person[] = [
	{
		age: 36,
		description: ['apples, bananas'],
		id: 0,
		name: 'Lorem'
	},
	{
		age: 32,
		description: ['oranges, pears'],
		id: 1,
		name: 'Ipsum'
	},
	{
		age: 45,
		description: ['blueberries, peaches'],
		id: 2,
		name: 'Amet'
	},
	{
		age: 50,
		description: ['nectarines, plums, raspberries'],
		id: 3,
		name: 'Elit'
	},
	{
		age: 22,
		description: ['mangoes, papayas'],
		id: 4,
		name: 'Dolor'
	}
]

const tableData0: TableProps<Person> = { columns, data }

export default tableData0
