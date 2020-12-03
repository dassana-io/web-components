import { ThemeType } from 'components'
import {
	ColumnFormats,
	ColumnType,
	ColumnTypes,
	TableProps
} from '../components/Table'

const { component, number, string } = ColumnTypes
const { none, byte, date, icon, coloredDot, link, toggle, tag } = ColumnFormats

export interface Data {
	byte: number
	date: number
	dot: string
	icon: string
	iconKey: string
	id: number
	link: string
	number: number
	string: string
	tag: string
	toggle: boolean
}

export const dateFormat = 'MM/DD/YYYY'

const columns: ColumnType[] = [
	{
		dataIndex: 'string',
		title: 'String',
		type: string
	},
	{
		dataIndex: 'number',
		format: none,
		title: 'Number - Default',
		type: number
	},
	{
		dataIndex: 'date',
		format: date,
		renderProps: {
			displayFormat: dateFormat
		},
		title: 'Number - Date',
		type: number
	},
	{
		dataIndex: 'byte',
		format: byte,
		title: 'Number - Byte',
		type: number
	},
	{
		dataIndex: 'tag',
		format: tag,
		title: 'Component - Tag',
		type: component
	},
	{
		dataIndex: 'link',
		format: link,
		renderProps: {
			buildHref: (record): string => `https://dassana.io/${record}`,
			target: '_blank'
		},
		title: 'Component - Link',
		type: component
	},
	{
		dataIndex: 'toggle',
		format: toggle,
		title: 'Component - Toggle',
		type: component
	},
	{
		dataIndex: 'iconKey',
		format: icon,
		renderProps: {
			type: 'iconKey'
		},
		title: 'Component - IconKey',
		type: component
	},
	{
		dataIndex: 'icon',
		format: icon,
		renderProps: {
			iconMap: {
				test: '/'
			},
			type: 'icon'
		},
		title: 'Component - Icon',
		type: component
	},
	{
		dataIndex: 'dot',
		format: coloredDot,
		renderProps: {
			colorMap: {
				test: {
					colors: {
						[ThemeType.light]: 'red',
						[ThemeType.dark]: 'red'
					},
					tooltipText: 'Hi I am colored'
				}
			}
		},
		title: 'Colored Dot',
		type: component
	}
]

const data: Data[] = [
	{
		byte: 1024,
		date: 1599193037581,
		dot: 'test',
		icon: 'test',
		iconKey: 'dassana',
		id: 0,
		link: 'test',
		number: 0,
		string: 'Dassana',
		tag: 'typescript',
		toggle: false
	}
]

const tableProps: TableProps<Data> = { columns, data }

export default tableProps
