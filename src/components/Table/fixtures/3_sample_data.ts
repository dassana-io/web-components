import { fakeApiCallSuccess } from 'components/utils'
import { ColumnFormats, ColumnType, ColumnTypes, TableProps } from '..'

const { component, number, string } = ColumnTypes
const { date, icon, link, toggle, tag } = ColumnFormats

export interface Client1 {
	admin_access?: boolean
	company?: string
	id: number
	linked_in?: string
	name?: string
	role?: { name: string; color: string }
	start_date?: number
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
		renderProps: {
			onSave: () => fakeApiCallSuccess()
		},
		title: 'Has Admin Access',
		type: component
	},
	{
		dataIndex: 'company',
		format: icon,
		renderProps: {
			iconMap: {
				azure: 'https://dummyimage.com/600x400/0072c6/fff&text=A',
				googleCloudService:
					'https://dummyimage.com/600x400/EA4335/fff&text=G'
			},
			label: { type: 'tooltip' },
			type: 'icon'
		},
		title: 'Company',
		type: component
	}
]

const data: Client1[] = [
	{
		admin_access: false,
		company: 'dassana',
		id: 0,
		linked_in: 'lorem-i',
		name: 'Lorem Ipsum',
		role: { color: 'blue', name: 'CEO' },
		start_date: 1519782342212
	},
	{
		id: 1,
		role: { color: 'magenta', name: 'Software Engineer' },
		start_date: 1553932342212
	},
	{
		company: 'googleCloudService',
		id: 2,
		linked_in: 'amet-c',
		name: 'Amet Consectetur'
	},
	{
		admin_access: true,
		company: 'azure',
		id: 3,
		linked_in: 'duis-irure',
		name: 'Duis Irure',
		role: { color: 'purple', name: 'Business Development' },
		start_date: 1531932342212
	}
]

const tableData2: TableProps<Client1> = {
	columns,
	data,
	searchProps: {
		placeholder: 'Search...',
		placement: 'right'
	}
}

export default tableData2
