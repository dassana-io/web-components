import { dateFormat } from '__mocks__/table_mock_data'
import { IconName } from 'components/Icon'
import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

// This file contains table data with col dataIndex as a JSONPath instead of string

const { component, number, string } = ColumnTypes
const { date, icon } = ColumnFormats

export interface JSONPathData {
	company: { id: string; name?: string; value: IconName }
	id: number
	name: { id: string; value: string }
	start_date: { id: string; date: number }
	vendors: { id: string; name?: string; value: string }[]
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name.value',
		title: 'Name',
		type: string
	},
	{
		dataIndex: 'start_date.date',
		format: date,
		renderProps: {
			displayFormat: dateFormat
		},
		title: 'Client Since',
		type: number
	},
	{
		dataIndex: 'company',
		format: icon,
		renderProps: {
			iconKey: 'value',
			type: 'iconKey'
		},
		title: 'Company',
		type: component
	},
	{
		dataIndex: 'vendors',
		format: icon,
		renderProps: {
			iconKey: 'value',
			type: 'iconUrl'
		},
		sort: false,
		title: 'Vendors',
		type: component
	}
]

const data: JSONPathData[] = [
	{
		company: { id: 'c1', name: 'azure', value: 'azure' },
		id: 0,
		name: { id: 'n1', value: 'Lorem ipsum' },
		start_date: { date: 1519782342212, id: 'sd1' },
		vendors: [
			{
				id: 'v1',
				value: 'https://dummyimage.com/300x300/a92323/fff&text=C'
			}
		]
	},
	{
		company: { id: 'c2', value: 'aws' },
		id: 1,
		name: { id: 'n2', value: 'Dolor Sit' },
		start_date: { date: 1593682342212, id: 'sd2' },
		vendors: [
			{
				id: 'v1',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v2',
				value: 'https://dummyimage.com/300x300/003366/fff&text=B'
			},
			{
				id: 'v3',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			}
		]
	},
	{
		company: { id: 'c2', value: 'dassana' },
		id: 2,
		name: { id: 'n2', value: 'Amet Consectetur Adipiscing Elit' },
		start_date: { date: 1553932342212, id: 'sd3' },
		vendors: [
			{
				id: 'v1',
				value: 'https://dummyimage.com/300x300/0072c6/fff&text=A'
			},
			{
				id: 'v2',
				value: 'https://dummyimage.com/300x300/EA4335/fff&text=G'
			},
			{
				id: 'v3',
				value: 'https://dummyimage.com/300x300/C1DB3C/fff&text=S'
			},
			{
				id: 'v4',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			},
			{
				id: 'v5',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v6',
				value: 'https://dummyimage.com/300x300/4b46cd/fff&text=Q'
			},
			{
				id: 'v7',
				value: 'https://dummyimage.com/300x300/003366/fff&text=B'
			},
			{
				id: 'v8',
				value: 'https://dummyimage.com/300x300/a92323/fff&text=C'
			},
			{
				id: 'v9',
				value: 'https://dummyimage.com/300x300/0072c6/fff&text=A'
			},
			{
				id: 'v10',
				value: 'https://dummyimage.com/300x300/EA4335/fff&text=G'
			},
			{
				id: 'v11',
				value: 'https://dummyimage.com/300x300/C1DB3C/fff&text=S'
			},
			{
				id: 'v12',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			},
			{
				id: 'v13',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v14',
				value: 'https://dummyimage.com/300x300/4b46cd/fff&text=Q'
			}
		]
	},
	{
		company: { id: 'c2', value: 'googleCloudService' },
		id: 3,
		name: { id: 'n2', value: 'Duis Irure' },
		start_date: { date: 1531932342212, id: 'sd3' },
		vendors: [
			{
				id: 'v1',
				value: 'https://dummyimage.com/300x300/C1DB3C/fff&text=S'
			},
			{
				id: 'v3',
				value: 'https://dummyimage.com/300x300/EA4335/fff&text=G'
			}
		]
	}
]

const tableData7: TableProps<JSONPathData> = { columns, data }

export default tableData7
