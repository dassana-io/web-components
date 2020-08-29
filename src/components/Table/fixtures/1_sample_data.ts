import { ColumnType, TableProps } from '../.'

export interface File {
	file_name: string
	data_size: number
	created_at: number
	updated_at?: number
}

const columns: ColumnType[] = [
	{
		dataIndex: 'file_name',
		title: 'File Name',
		type: 'string'
	},
	{
		dataIndex: 'data_size',
		format: 'byte',
		title: 'Data',
		type: 'number'
	},
	{
		dataIndex: 'created_at',
		displayFormat: 'MMM D, YYYY h:mm A', // moment.js display format
		format: 'date',
		title: 'Uploaded Time',
		type: 'number'
	},
	{
		dataIndex: 'updated_at',
		displayFormat: 'lll', //moment.js format shortcuts also work
		format: 'date',
		title: 'Last Updated Time',
		type: 'number'
	}
]

const data: File[] = [
	{
		created_at: 1598400668681,
		data_size: 1048576,
		file_name: 'IMG_4542.jpeg'
	},
	{
		created_at: 1582330066861,
		data_size: 1998576,
		file_name: 'test_123.png'
	},
	{
		created_at: 1553223066861,
		data_size: 1024,
		file_name: 'passwords.txt',
		updated_at: 1582330063211
	}
]

const tableData1: TableProps<File> = { columns, data }

export default tableData1
