import { action } from '@storybook/addon-actions'
import { IconProps } from '../../Icon'
import { LinkProps } from '../../Link'
import { TagProps } from '../../Tag'
import { ToggleProps } from '../../Toggle'
import { ColumnType, TableProps } from '..'

export interface Client {
	name: string
	start_date: number
	role: TagProps
	linked_in: LinkProps
	admin_access: ToggleProps
	company: IconProps
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
		dataIndex: 'admin_access',
		format: 'toggle',
		title: 'Has Admin Access',
		type: 'component'
	},
	{
		dataIndex: 'company',
		format: 'icon',
		title: 'Company',
		type: 'component'
	}
]

const toggleProps: ToggleProps = {
	onChange: action('onChange'),
	size: 'small'
}

const linkProps: LinkProps = {
	children: 'link',
	href: '/',
	target: '_blank'
}

const data: Client[] = [
	{
		admin_access: { ...toggleProps, defaultChecked: true },
		company: {
			iconKey: 'dassana-blue'
		},
		linked_in: { ...linkProps, children: '/in/lorem-i' },
		name: 'Lorem Ipsum',
		role: { children: 'CEO', color: 'blue' },
		start_date: 1519782342212
	},
	{
		admin_access: { ...toggleProps, defaultChecked: false, disabled: true },
		company: {
			iconKey: 'aws-logo'
		},
		linked_in: { ...linkProps, children: '/in/dolor-s' },
		name: 'Dolor Sit',
		role: { children: 'Software Engineer', color: 'magenta' },
		start_date: 1593682342212
	},
	{
		admin_access: { ...toggleProps },
		company: {
			iconKey: 'dassana-orange'
		},
		linked_in: { ...linkProps, children: '/in/amet-c' },
		name: 'Amet Consectetur',
		role: { children: 'Designer', color: 'green' },
		start_date: 1553932342212
	},
	{
		admin_access: { ...toggleProps, defaultChecked: true },
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
