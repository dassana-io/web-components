import { LinkProps } from '../Link'
import React from 'react'
import { IconProps, TagProps, ToggleProps } from './types'
import { Meta, Story } from '@storybook/react/types-6-0'
import Table, { ColumnType, TableProps } from '.'

export default {
	component: Table,
	excludeStories: /.*Data$/,
	title: 'Table'
} as Meta

export interface User {
	firstName: string
	age: number
	label: TagProps
	linkedin: LinkProps
	toggle: ToggleProps
	icon: IconProps
}

const columns: ColumnType[] = [
	{
		dataIndex: 'firstName',
		title: 'First Name',
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

const iconProps: IconProps = {
	iconKey: 'dassana-blue'
}

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
		firstName: 'Dolor Sit',
		icon: {
			iconKey: 'dassana-blue'
		},
		label: { children: 'developer', color: 'magenta' },
		linkedin: {
			...linkProps,
			children: '/in/dolor-sit'
		},
		toggle: {
			...toggleProps,
			defaultChecked: true
		}
	},
	{
		age: 20,
		firstName: 'Lorem Ipsum',
		icon: {
			iconKey: 'aws-logo'
		},
		label: { children: 'CEO', color: 'blue' },
		linkedin: {
			...linkProps,
			children: '/in/lorem-i'
		},
		toggle: {
			...toggleProps
		}
	},
	{
		age: 35,
		firstName: 'Amet Consectetur',
		label: { children: 'designer', color: 'green' },
		linkedin: {
			...linkProps,
			children: '/in/amet-c'
		},
		toggle: {
			...toggleProps,
			defaultChecked: true,
			disabled: true
		},
		icon: {
			iconKey: 'dassana-orange'
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
