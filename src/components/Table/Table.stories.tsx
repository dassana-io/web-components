import { action } from '@storybook/addon-actions'
import { IconProps } from '../Icon'
import { LinkProps } from '../Link'
import React from 'react'
import { TagProps } from '../Tag'
import { ToggleProps } from '../Toggle'
import { Meta, Story } from '@storybook/react/types-6-0'
import Table, { ColumnType, TableProps } from '.'

export default {
	component: Table,
	excludeStories: /.*Data$/,
	title: 'Table'
} as Meta

export interface User {
	date: number
	data: number
	label: TagProps
	link: LinkProps
	toggle: ToggleProps
	icon: IconProps
}

const columns: ColumnType[] = [
	{
		dataIndex: 'date',
		displayFormat: 'MM/DD/YYYY',
		format: 'date',
		title: 'Date',
		type: 'number'
	},
	{
		dataIndex: 'data',
		format: 'byte',
		title: 'Data',
		type: 'number'
	},
	{
		dataIndex: 'label',
		format: 'tag',
		title: 'Label',
		type: 'component'
	},
	{
		dataIndex: 'link',
		format: 'link',
		title: 'Link',
		type: 'component'
	},
	{
		dataIndex: 'toggle',
		format: 'toggle',
		title: 'Toggle',
		type: 'component'
	},
	{
		dataIndex: 'icon',
		format: 'icon',
		title: 'Icon',
		type: 'component'
	}
]

const linkProps: LinkProps = {
	children: 'link',
	href: '/',
	target: '_blank'
}

const toggleProps: ToggleProps = {
	onChange: action('onChange'),
	size: 'small'
}

const data: User[] = [
	{
		data: 1024,
		date: 1598400668681,
		icon: {
			iconKey: 'dassana-blue'
		},
		label: { children: 'developer', color: 'magenta' },
		link: {
			...linkProps,
			children: 'dolor-sit'
		},
		toggle: {
			...toggleProps,
			defaultChecked: true
		}
	},
	{
		data: 100,
		date: 1570504402657,
		icon: {
			iconKey: 'aws-logo'
		},
		label: { children: 'CEO', color: 'blue' },
		link: {
			...linkProps,
			children: 'lorem-i'
		},
		toggle: {
			...toggleProps
		}
	},
	{
		data: 1048576,
		date: 1581033743000,
		icon: {
			iconKey: 'dassana-orange'
		},
		label: { children: 'designer', color: 'green' },
		link: {
			...linkProps,
			children: 'amet-c'
		},
		toggle: {
			...toggleProps,
			defaultChecked: true,
			disabled: true
		}
	}
]

export const tableData: TableProps<User> = {
	columns,
	data
}

const Template: Story<TableProps<User>> = args => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
	...tableData
}
