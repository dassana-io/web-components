import { action } from '@storybook/addon-actions'
import { createUseStyles } from 'react-jss'
import { Story } from '@storybook/react/types-6-0'
import tableData4 from './fixtures/4_sample_data'
import { DataId, Table, TableProps } from '.'
import React, { Key, useState } from 'react'
import { styleguide, themes, ThemeType } from 'components/assets/styles'
import tableData0, { Person } from './fixtures/0_sample_data'
import tableData1, { File } from './fixtures/1_sample_data'
import tableData2, { Client } from './fixtures/2_sample_data'
import tableData3, { Client1 } from './fixtures/3_sample_data'
import tableData5, { Dot } from './fixtures/5_sample_data'

const { spacing } = styleguide

const { dark, light } = ThemeType

const commonArgTypes = {
	activeRowKey: {
		control: { disable: true }
	},
	dataTag: {
		control: { disable: true }
	},
	onRowClick: {
		control: { disable: true },
		description: 'Optional callback that runs when a table row is clicked.',
		table: {
			type: {
				detail: `
        interface OnRowClick<Data> {
  (data: Data, rowIndex: number): void
  }`
			}
		}
	},
	pagination: {
		description:
			'Optional prop to show or hide pagination. Pagination is present on the bottom right by default.'
	},
	searchProps: {
		control: 'object',
		defaultValue: { placeholder: '', placement: 'left' }, // This isn't the default, it's a placeholder for storybook
		table: {
			type: {
				detail: `
        interface SearchProps {
  placeholder?: string
  placement?: 'left' | 'right'
}`
			}
		}
	}
}

const useStyles = createUseStyles({
	decorator: {
		background: themes[light].background.secondary,
		height: `calc(100vh - ${spacing.m * 2}px)`,
		padding: spacing.l,
		width: '100%'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $decorator': {
				background: themes[dark].background.secondary
			}
		}
	}
})

export const Decorator = (TableStory: Story) => {
	const classes = useStyles()

	return (
		<div className={classes.decorator}>
			<TableStory />
		</div>
	)
}

const DecoratedTableStory = <Data extends DataId>(props: TableProps<Data>) => {
	const [activeRowKey, setActiveRowKey] = useState<Key>('')

	const onRowClick = (clickedRowData: Data, i: number) => {
		action('onRowClick')(clickedRowData, i)

		activeRowKey === clickedRowData.id
			? setActiveRowKey('')
			: setActiveRowKey(clickedRowData.id)
	}

	return (
		<Table<Data>
			{...props}
			activeRowKey={activeRowKey}
			onRowClick={onRowClick}
		/>
	)
}

const SimpleTemplate: Story<TableProps<Person>> = args => (
	<Table<Person> {...args} />
)
export const Simple = SimpleTemplate.bind({})
Simple.args = tableData0
Simple.argTypes = {
	...commonArgTypes,
	columns: {
		description:
			'Array of column objects. Click to view a simplified partial Column interface used for this simple table.',
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
			'Array of data objects. The Data should be defined and provided when you use the table. For this table, the Data would be: ',
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
	<DecoratedTableStory {...args} />
)
export const Number = NumberTemplate.bind({})
Number.args = tableData1
Number.argTypes = {
	...commonArgTypes,
	columns: {
		description:
			/* eslint-disable quotes */
			"Array of column objects. Click to view a partial Column interface (`'number'` type):",
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

interface NumberDate {
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

type NumberType = NumberDefaultType | NumberDate | NumberByteType`
			}
		}
	},
	data: {
		description:
			'Array of data objects. The Data should be defined and provided when you use the table. For this table, the Data would be: ',
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
	<DecoratedTableStory<Client> {...args} />
)
export const Mixed = MixedTemplate.bind({})
Mixed.args = tableData2
Mixed.argTypes = {
	...commonArgTypes,
	columns: {
		control: { disable: true },
		description: `Array of column objects. [Click to view a partial Column interface.](/?path=/docs/table--simple#representing-columntype-with-typescript-1)`
	},
	data: {
		control: { disable: true },
		description:
			'Array of data objects. The Data should be defined and provided when you use the table. For this table, the Data would be: ',
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
	<DecoratedTableStory<Client1> {...args} />
)
export const MissingCells = MissingCellsTemplate.bind({})
MissingCells.args = {
	...tableData3
}
MissingCells.argTypes = {
	...commonArgTypes,
	columns: {
		control: { disable: true },
		description: `Array of column objects. [Click to view a partial Column interface.](/?path=/docs/table--simple#representing-columntype-with-typescript-1)`
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

export const Paginated = NumberTemplate.bind({})
Paginated.args = tableData4
Paginated.argTypes = commonArgTypes

const ColoredDotTemplate: Story<TableProps<Dot>> = args => (
	<Table<Dot> {...args} />
)
export const ColoredDot = ColoredDotTemplate.bind({})
ColoredDot.args = tableData5
ColoredDot.argTypes = commonArgTypes
