import { ColumnType, TableProps } from '..'

export interface Client {
	name?: string
	start_date?: number
	role?: { name: string; color: string }
	linked_in?: string
	company?: string
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: 'string'
	},
	{
		dataIndex: 'start_date',
		format: 'date',
		renderProps: {
			displayFormat: 'MM/DD/YYYY'
		},
		title: 'Client Since',
		type: 'number'
	},
	{
		dataIndex: 'role',
		format: 'tag',
		title: 'Role',
		type: 'component'
	},
	{
		dataIndex: 'linked_in',
		format: 'link',
		renderProps: {
			buildHref: (): string => '/'
		},
		target: '_blank',
		title: 'LinkedIn',
		type: 'component'
	},
	{
		dataIndex: 'company',
		format: 'icon',
		renderProps: {
			type: 'iconKey'
		},
		title: 'Company',
		type: 'component'
	}
]

const data: Client[] = [
	{
		company: 'dassana',
		name: 'Lorem Ipsum',
		role: { color: 'blue', name: 'CEO' },
		start_date: 1519782342212
	},
	{
		linked_in: '/in/dolor-s',
		role: { color: 'magenta', name: 'Software Engineer' }
	},
	{
		company: 'dassana',
		linked_in: '/in/amet-c',
		name: 'Amet Consectetur',
		start_date: 1553932342212
	},
	{
		company: 'dassana',
		linked_in: '/in/duis-irure',
		name: 'Duis Irure',
		role: { color: 'purple', name: 'Business Development' },
		start_date: 1531932342212
	}
]

const tableData2: TableProps<Client> = { columns, data }

export default tableData2
