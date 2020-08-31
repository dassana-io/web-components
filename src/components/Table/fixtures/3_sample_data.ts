import { IconProps } from '../../Icon'
import { LinkProps } from '../../Link'
import { TagProps } from '../../Tag'
import { ColumnType, TableProps } from '..'

export interface Client {
	start_date?: number
	name?: string
	company?: IconProps
	role?: TagProps
	linked_in?: LinkProps
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: 'string'
	},
	{
		dataIndex: 'start_date',
		displayFormat: 'MM/DD/YYYY',
		format: 'date',
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
		title: 'LinkedIn',
		type: 'component'
	},
	{
		dataIndex: 'company',
		format: 'icon',
		title: 'Company',
		type: 'component'
	}
]

const linkProps: LinkProps = {
	children: 'link',
	href: '/',
	target: '_blank'
}

const data: Client[] = [
	{
		company: {
			iconKey: 'dassana-blue'
		},
		name: 'Lorem Ipsum',
		role: { children: 'CEO', color: 'blue' },
		start_date: 1519782342212
	},
	{
		linked_in: { ...linkProps, children: '/in/dolor-s' },
		role: { children: 'Software Engineer', color: 'magenta' }
	},
	{
		company: {
			iconKey: 'dassana-orange'
		},
		linked_in: { ...linkProps, children: '/in/amet-c' },
		name: 'Amet Consectetur',
		start_date: 1553932342212
	},
	{
		company: {
			icon: 'https://dummyimage.com/200x200/000/fff&text=C'
		},
		linked_in: { ...linkProps, children: '/in/duis-irure' },
		name: 'Duis Irure',
		role: { children: 'Business Development', color: 'purple' },
		start_date: 1531932342212
	}
]

const tableData2: TableProps<Client> = { columns, data }

export default tableData2
