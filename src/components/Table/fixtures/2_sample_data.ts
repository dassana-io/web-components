import { IconName } from '../../Icon'
import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

const { component, number, string } = ColumnTypes
const { date, icon, link, toggle, tag } = ColumnFormats

export interface Client {
	name: string
	start_date: number
	role: { name: string; color: string }
	linked_in: string
	admin_access: boolean
	company: IconName
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: string
	},
	{
		dataIndex: 'start_date',
		format: date,
		renderProps: {
			displayFormat: 'MM/DD/YYYY'
		},
		title: 'Client Since',
		type: number
	},
	{
		dataIndex: 'role',
		format: tag,
		title: 'Role',
		type: component
	},
	{
		dataIndex: 'linked_in',
		format: link,
		renderProps: {
			buildHref: (): string => '/',
			target: '_blank'
		},
		title: 'LinkedIn',
		type: component
	},
	{
		dataIndex: 'admin_access',
		format: toggle,
		title: 'Has Admin Access',
		type: component
	},
	{
		dataIndex: 'company',
		format: icon,
		renderProps: {
			type: 'iconKey'
		},
		title: 'Company',
		type: component
	}
]

const data: Client[] = [
	{
		admin_access: true,
		company: 'azure',
		linked_in: 'lorem-i',
		name: 'Lorem Ipsum',
		role: { color: 'blue', name: 'CEO' },
		start_date: 1519782342212
	},
	{
		admin_access: false,
		company: 'aws',
		linked_in: 'dolor-s',
		name: 'Dolor Sit',
		role: { color: 'magenta', name: 'Software Engineer' },
		start_date: 1593682342212
	},
	{
		admin_access: true,
		company: 'dassana',
		linked_in: 'amet-c',
		name: 'Amet Consectetur',
		role: { color: 'green', name: 'Designer' },
		start_date: 1553932342212
	},
	{
		admin_access: false,
		company: 'google-cloud',
		linked_in: 'duis-irure',
		name: 'Duis Irure',
		role: { color: 'purple', name: 'Business Development' },
		start_date: 1531932342212
	}
]

const tableData2: TableProps<Client> = { columns, data }

export default tableData2
