import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import Table, { TableProps } from '.'
import tableData0, { Person } from './fixtures/0_sample_data'
import tableData1, { File } from './fixtures/1_sample_data'
import tableData2, { Client } from './fixtures/2_sample_data'
import tableData3, { Client1 } from './fixtures/3_sample_data'

const SimpleTemplate: Story<TableProps<Person>> = args => (
	<Table<Person> {...args} />
)
export const Simple = SimpleTemplate.bind({})
Simple.args = {
	...tableData0
}
Simple.argTypes = {
	columns: {
		description:
			'Array of column objects. Click to view a simplified partial ColumnType interface used for this simple table.',
		table: {
			type: {
				detail: `
        interface PartialColumnType {
dataIndex: string
title: string
type: 'string' | 'number'
sort?: boolean
}`
			}
		}
	},
	data: {
		description:
			'Array of data objects. The DataType should be defined and provided when you use the table. For this table, the DataType would be: ',
		table: {
			type: {
				detail: `
          interface Person {
name: string
age: number
}`
			}
		}
	}
}

const NumberTemplate: Story<TableProps<File>> = args => (
	<Table<File> {...args} />
)
export const Number = NumberTemplate.bind({})
Number.args = {
	...tableData1
}
Number.argTypes = {
	columns: {
		description:
			'Array of column objects. Click to view a partial ColumnType interface used for this table (string type is not shown).',
		table: {
			type: {
				detail: `
        interface NumberPartialColumnType {
  dataIndex: string
  title: string
  type:  'number'
  format?: 'none' | 'date' | 'byte'
  displayFormat?: string // custom date format string
  sort?: boolean
}`
			}
		}
	},
	data: {
		description:
			'Array of data objects. The DataType should be defined and provided when you use the table. For this table, the DataType would be: ',
		table: {
			type: {
				detail: `
        interface File {
  file_name: string
  data_size: number
  created_at: number
  updated_at?: number // optional keys won't be rendered
}`
			}
		}
	}
}
const MixedTemplate: Story<TableProps<Client>> = args => (
	<Table<Client> {...args} />
)
export const Mixed = MixedTemplate.bind({})
Mixed.args = {
	...tableData2
}
Mixed.argTypes = {
	columns: {
		control: { disable: true },
		description:
			'Array of column objects. Click to view a partial ColumnType interface used for this table (string & number types are not shown).',
		table: {
			type: {
				detail: `
          interface NumberPartialColumnType {
    dataIndex: string
    title: string
    type:  'component'
    format: 'icon' | 'link' | 'tag' | 'toggle' // format is required for component type
    sort?: boolean
  }`
			}
		}
	},
	data: {
		control: { disable: true },
		description:
			'Array of data objects. The DataType should be defined and provided when you use the table. For this table, the DataType would be: ',
		table: {
			type: {
				detail: `
        interface Client {
  name: string
  start_date: number
  role: TagProps
  linked_in: LinkProps
  admin_access: ToggleProps
  company: IconProps
}`
			}
		}
	}
}

const MissingCellsTemplate: Story<TableProps<Client1>> = args => (
	<Table<Client1> {...args} />
)
export const MissingCells = MissingCellsTemplate.bind({})
MissingCells.args = {
	...tableData3
}
