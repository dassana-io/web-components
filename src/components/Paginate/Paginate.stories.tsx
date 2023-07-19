import { Paginate } from './index'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'
import tableData4, { type File } from '../Table/fixtures/4_sample_data'

export default {
	component: Paginate,
	title: 'Paginate'
} as Meta

const Template: Story = args => (
	<Paginate<File>
		data={tableData4.data}
		itemRender={(data: File) => <div>{JSON.stringify(data)}</div>}
		{...args}
	/>
)

export const Default = Template.bind({})
