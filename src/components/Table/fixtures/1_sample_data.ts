import { DateDisplayFormat } from '../types'
import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

export interface File {
	created_at: number
	data_size: number
	id: number
	file_name: string
	last_opened?: number
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
		dataIndex: 'last_opened',
		format: date,
		renderProps: { displayFormat: DateDisplayFormat.fromNow }, // display date as time from now. E.g. 3 months ago
		title: 'Last Opened',
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
		file_name: 'IMG_4542.jpeg',
		id: 0,
		last_opened: 1598400668681
	},
	{
		created_at: 1582330066861,
		data_size: 1998576,
		file_name: 'test_123.png',
		id: 1,
		last_opened: 1603779899922
	},
	{
		created_at: 1553223066861,
		data_size: 1024,
		file_name: 'passwords.txt',
		id: 2,
		updated_at: 1582330063211
	},
	{
		created_at: 1511022066861,
		data_size: 4194599,
		file_name: 'birthday.mp4',
		id: 3
	},
	{
		created_at: 1515021066861,
		data_size: 2048,
		file_name: 'letter.txt',
		id: 4,
		updated_at: 1515121066861
	}
]

const tableData1: TableProps<File> = { columns, data }

export default tableData1
