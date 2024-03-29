import { dateFormat } from '__mocks__/table_mock_data'
import { type IconName } from 'components/Icon'
import {
	ColumnFormats,
	type ColumnType,
	ColumnTypes,
	IconCellLabelType,
	type TableProps
} from '..'

// This file contains table data with col dataIndex as a JSONPath instead of string

const { component, number, string } = ColumnTypes
const { date, icon } = ColumnFormats

export interface JSONPathData {
	buildHrefIconJSONPath: { id: string, label: string }
	company: { id: string, name?: string, value: IconName }
	icon: string
	id: number
	name: { id: string, value: string }
	start_date: { id: string, date: number }
	vendors: Array<{ id: string, name?: string, value: string }>
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
			label: { labelKey: 'value', type: IconCellLabelType.tooltip },
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
			label: { labelKey: 'name', type: IconCellLabelType.tooltip },
			type: 'iconUrl'
		},
		sort: false,
		title: 'Vendors',
		type: component
	},
	{
		dataIndex: 'icon',
		format: icon,
		renderProps: {
			buildHref: name =>
				`https://dummyimage.com/300x300/${name}1DB3C/fff&text=${name}`,
			label: { type: IconCellLabelType.tooltip },
			type: 'icon'
		},
		title: 'Icon',
		type: component
	},
	{
		dataIndex: 'buildHrefIconJSONPath',
		format: icon,
		renderProps: {
			buildHref: (name, data = {}) =>
				`https://dummyimage.com/300x300/${name}848CF/fff&text=${name}${data.icon}`,
			iconKey: 'id',
			label: { labelKey: 'label', type: IconCellLabelType.tooltip },
			type: 'icon'
		},
		title: 'Build Icon Link',
		type: component
	},
	{
		dataIndex: 'icon',
		format: icon,
		renderProps: {
			buildHref: () => 'https://',
			type: 'icon'
		},
		title: 'Broken Icon',
		type: component
	}
]

const data: JSONPathData[] = [
	{
		buildHrefIconJSONPath: { id: 'H', label: 'H' },
		company: { id: 'c1', name: 'azure', value: 'azure' },
		icon: 'A',
		id: 0,
		name: { id: 'n1', value: 'Lorem ipsum' },
		start_date: { date: 1519782342212, id: 'sd1' },
		vendors: [
			{
				id: 'v1',
				name: 'C',
				value: 'https://dummyimage.com/300x300/a92323/fff&text=C'
			}
		]
	},
	{
		buildHrefIconJSONPath: { id: 'E', label: 'E' },
		company: { id: 'c2', value: 'aws' },
		icon: 'B',
		id: 1,
		name: { id: 'n2', value: 'Dolor Sit' },
		start_date: { date: 1593682342212, id: 'sd2' },
		vendors: [
			{
				id: 'v1',
				name: 'T',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v2',
				name: 'B',
				value: 'https://dummyimage.com/300x300/003366/fff&text=B'
			},
			{
				id: 'v3',
				name: 'M',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			}
		]
	},
	{
		buildHrefIconJSONPath: { id: 'B', label: 'B' },
		company: { id: 'c2', value: 'dassana' },
		icon: 'C',
		id: 2,
		name: { id: 'n2', value: 'Amet Consectetur Adipiscing Elit' },
		start_date: { date: 1553932342212, id: 'sd3' },
		vendors: [
			{
				id: 'v1',
				name: 'A',
				value: 'https://dummyimage.com/300x300/0072c6/fff&text=A'
			},
			{
				id: 'v2',
				name: 'G',
				value: 'https://dummyimage.com/300x300/EA4335/fff&text=G'
			},
			{
				id: 'v3',
				name: 'S',
				value: 'https://dummyimage.com/300x300/C1DB3C/fff&text=S'
			},
			{
				id: 'v4',
				name: 'M',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			},
			{
				id: 'v5',
				name: 'T',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v6',
				name: 'Q',
				value: 'https://dummyimage.com/300x300/4b46cd/fff&text=Q'
			},
			{
				id: 'v7',
				name: 'B',
				value: 'https://dummyimage.com/300x300/003366/fff&text=B'
			},
			{
				id: 'v8',
				name: 'C',
				value: 'https://dummyimage.com/300x300/a92323/fff&text=C'
			},
			{
				id: 'v9',
				name: 'A',
				value: 'https://dummyimage.com/300x300/0072c6/fff&text=A'
			},
			{
				id: 'v10',
				name: 'G',
				value: 'https://dummyimage.com/300x300/EA4335/fff&text=G'
			},
			{
				id: 'v11',
				name: 'S',
				value: 'https://dummyimage.com/300x300/C1DB3C/fff&text=S'
			},
			{
				id: 'v12',
				name: 'M',
				value: 'https://dummyimage.com/300x300/5848CF/fff&text=M'
			},
			{
				id: 'v13',
				name: 'T',
				value: 'https://dummyimage.com/300x300/bbdcf2/fff&text=T'
			},
			{
				id: 'v14',
				name: 'Q',
				value: 'https://dummyimage.com/300x300/4b46cd/fff&text=Q'
			}
		]
	},
	{
		buildHrefIconJSONPath: { id: 'D', label: 'D' },
		company: { id: 'c2', value: 'googleCloudService' },
		icon: 'D',
		id: 3,
		name: { id: 'n2', value: 'Duis Irure' },
		start_date: { date: 1531932342212, id: 'sd3' },
		vendors: [
			{
				id: 'v1',
				name: 'S',
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
