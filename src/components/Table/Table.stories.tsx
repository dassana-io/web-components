import { action } from '@storybook/addon-actions'
import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Table, TableProps } from '.'
import tableData0, { Person } from './fixtures/0_sample_data'
import tableData1, { File } from './fixtures/1_sample_data'
import tableData2, { Client } from './fixtures/2_sample_data'
import tableData3, { Client1 } from './fixtures/3_sample_data'

const commonArgTypes = {
	onRowClick: {
		control: { disable: true },
		defaultValue: action('onRowClick'),
		description: 'Optional callback that runs when a table row is clicked.',
		table: {
			type: {
				detail: `
        interface OnRowClick {
  (data: Record<string, any>, rowIndex: number): void
}`
			}
		}
	}
}

const SimpleTemplate: Story<TableProps<Person>> = args => (
	<Table<Person> {...args} />
)
export const Simple = SimpleTemplate.bind({})
Simple.args = {
	...tableData0
}
Simple.argTypes = {
	...commonArgTypes,
	columns: {
		description:
			'Array of column objects. Click to view a simplified partial ColumnType interface used for this simple table.',
		table: {
			type: {
				detail: `
        interface PartialColumnType {
  dataIndex: string
  title: string
  type: ColumnTypes.string | ColumnTypes.number
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
	...commonArgTypes,
	columns: {
		description:
			/* eslint-disable quotes */
			"Array of column objects. Click to view a partial ColumnType interface (`'number'` type):",
		table: {
			type: {
				detail: `
        interface NumberDefaultType {
  dataIndex: string
  title: string
  type: ColumnTypes.number
  format?: ColumnFormats.none
  sort?: boolean
}

interface NumberDateType {
  dataIndex: string
  title: string
  type: ColumnTypes.number
  format?: ColumnFormats.date
  sort?: boolean
  renderProps?: {
    displayFormat?: string
  }
}

interface NumberByteType {
  dataIndex: string
  title: string
  type: ColumnTypes.number
  format?: ColumnFormats.byte
  sort?: boolean
}

type NumberType = NumberDefaultType | NumberDateType | NumberByteType`
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
  created_at: number
  data_size?: number
  updated_at?: number
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
	...commonArgTypes,
	columns: {
		control: { disable: true },
		description: `Array of column objects. [Click to view a partial ColumnType interface.](/?path=/docs/table--simple#representing-columntype-with-typescript-1)`
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
  role: { name: string; color: string }
  linked_in: string
  admin_access: boolean
  company: IconName
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
MissingCells.argTypes = {
	...commonArgTypes,
	columns: {
		control: { disable: true },
		description: `Array of column objects. [Click to view a partial ColumnType interface.](/?path=/docs/table--simple#representing-columntype-with-typescript-1)`
	},
	data: {
		control: { disable: true },
		description:
			'Make sure to declare keys as optional in the typescript interface if there will be missing data.',
		table: {
			type: {
				detail: `
        interface Client {
  name?: string
  start_date?: number
  role?: { name: string; color: string }
  linked_in?: string
  admin_access?: boolean
  company?: string
}`
			}
		}
	}
}
