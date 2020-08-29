import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import Table, { TableProps } from '.'
import tableData0, { Person } from './fixtures/0_sample_data'
import tableData1, { File } from './fixtures/1_sample_data'
import tableData2, { Client } from './fixtures/2_sample_data'

const SimpleTemplate: Story<TableProps<Person>> = args => (
	<Table<Person> {...args} />
)
export const Simple = SimpleTemplate.bind({})
Simple.args = {
	...tableData0
}

const NumberTemplate: Story<TableProps<File>> = args => (
	<Table<File> {...args} />
)
export const Number = NumberTemplate.bind({})
Number.args = {
	...tableData1
}

const DefaultTemplate: Story<TableProps<Client>> = args => (
	<Table<Client> {...args} />
)
export const Default = DefaultTemplate.bind({})
Default.args = {
	...tableData2
}
