import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

export interface File {
	file_name: string
	data_size: number
	created_at: number
	updated_at?: number // Pass an optional type if there will be missing data
}

export const dateFormat0 = 'MMM D, YYYY h:mm A'
export const dateFormat1 = 'lll'

const { number, string } = ColumnTypes
const { byte, date } = ColumnFormats

const columns: ColumnType[] = [
	{
		dataIndex: 'file_name',
		title: 'File Name',
		type: string
	},
	{
		dataIndex: 'data_size',
		format: byte,
		title: 'Size',
		type: number
	},
	{
		dataIndex: 'created_at',
		format: date,
		renderProps: { displayFormat: dateFormat0 }, // moment.js display format
		title: 'Uploaded Time',
		type: number
	},
	{
		dataIndex: 'updated_at',
		format: date,
		renderProps: { displayFormat: dateFormat1 }, // moment.js format shortcuts also work
		title: 'Last Updated Time',
		type: number
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
	},
	{
		created_at: 1511022066861,
		data_size: 4194599,
		file_name: 'birthday.mp4'
	},
	{
		created_at: 1515021066861,
		data_size: 2048,
		file_name: 'letter.txt',
		updated_at: 1515121066861
	}
]

const tableData1: TableProps<File> = { columns, data }

export default tableData1
