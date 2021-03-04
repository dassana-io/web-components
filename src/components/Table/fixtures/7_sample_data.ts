import { dateFormat } from '__mocks__/table_mock_data'
import { IconName } from 'components/Icon'
import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

// This file contains table data with col dataIndex as a JSONPath instead of string

const { component, number, string } = ColumnTypes
const { date, icon } = ColumnFormats

export interface JSONPathData {
	company: { id: string; value: IconName }
	id: number
	name: { id: string; value: string }
	start_date: { id: string; date: number }
}

const columns: ColumnType[] = [
	{
		dataIndex: '$.name.value',
		title: 'Name',
		type: string
	},
	{
		dataIndex: '$.start_date.date',
		format: date,
		renderProps: {
			displayFormat: dateFormat
		},
		title: 'Client Since',
		type: number
	},
	{
		dataIndex: '$.company.value',
		format: icon,
		renderProps: {
			type: 'iconKey'
		},
		title: 'Company',
		type: component
	}
]

const data: JSONPathData[] = [
	{
		company: { id: 'c1', value: 'azure' },
		id: 0,
		name: { id: 'n1', value: 'Lorem ipsum' },
		start_date: { date: 1519782342212, id: 'sd1' }
	},
	{
		company: { id: 'c2', value: 'aws' },
		id: 1,
		name: { id: 'n2', value: 'Dolor Sit' },
		start_date: { date: 1593682342212, id: 'sd2' }
	},
	{
		company: { id: 'c2', value: 'dassana' },
		id: 2,
		name: { id: 'n2', value: 'Amet Consectetur' },
		start_date: { date: 1553932342212, id: 'sd3' }
	},
	{
		company: { id: 'c2', value: 'googleCloudService' },
		id: 3,
		name: { id: 'n2', value: 'Duis Irure' },
		start_date: { date: 1531932342212, id: 'sd3' }
	}
]

const tableData7: TableProps<JSONPathData> = { columns, data }

export default tableData7
