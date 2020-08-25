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
	name: string
	age: number
	label: TagProps
	linkedin: LinkProps
	toggle: ToggleProps
	icon: IconProps
}

const columns: ColumnType[] = [
	{
		dataIndex: 'name',
		title: 'Name',
		type: 'string'
	},
	{
		dataIndex: 'age',
		title: 'Age',
		type: 'number'
	},
	{
		dataIndex: 'label',
		format: 'tag',
		sort: false,
		title: 'Label',
		type: 'component'
	},
	{
		dataIndex: 'linkedin',
		format: 'link',
		sort: false,
		title: 'Linkedin',
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
	onChange: () => {
		console.log('toggled')
	},
	size: 'small'
}

const data: User[] = [
	{
		age: 30,
		icon: {
			iconKey: 'dassana-blue'
		},
		label: { children: 'developer', color: 'magenta' },
		linkedin: {
			...linkProps,
			children: '/in/dolor-sit'
		},
		name: 'Dolor Sit',
		toggle: {
			...toggleProps,
			defaultChecked: true
		}
	},
	{
		age: 20,
		icon: {
			iconKey: 'aws-logo'
		},
		label: { children: 'CEO', color: 'blue' },
		linkedin: {
			...linkProps,
			children: '/in/lorem-i'
		},
		name: 'Lorem Ipsum',
		toggle: {
			...toggleProps
		}
	},
	{
		age: 35,
		icon: {
			iconKey: 'dassana-orange'
		},
		label: { children: 'designer', color: 'green' },
		linkedin: {
			...linkProps,
			children: '/in/amet-c'
		},
		name: 'Amet Consectetur',
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
