import { action } from '@storybook/addon-actions'
import { Button } from 'components/Button'
import omit from 'lodash/omit'
import { api as createAxiosInstance, Emitter } from '@dassana-io/web-utils'
import { Filters, FiltersMode, FiltersProps } from '.'
import { filtersConfig, mockFilterOptions } from './fixtures/0_sample_data'
import { FiltersList, UseFiltersMethods } from './types'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useRef } from 'react'

export default {
	argTypes: {
		onSelectedFiltersChange: {
			defaultValue: action('onSelectedFiltersChange')
		}
	},
	component: Filters,
	title: 'Filters'
} as Meta

const Template: Story<FiltersProps> = args => <Filters {...args} />

export const Default = Template.bind({})
Default.args = {
	api: createAxiosInstance(''),
	config: filtersConfig,
	emitter: new Emitter(),
	endpoint: 'https://mockendpoint.com',
	mode: FiltersMode.backend,
	omittedFilterKeys: ['name']
}

export const ClientSide = Template.bind({})
ClientSide.args = {
	config: filtersConfig,
	filterOptions: mockFilterOptions.map(filter =>
		omit(filter, ['staticFilter', 'operator'])
	),
	mode: FiltersMode.frontend
}

const ControlledTemplate: Story<FiltersProps> = args => {
	const filtersRef = useRef<UseFiltersMethods>(null)

	const filtersList: FiltersList = [
		{
			id: 'some-id',
			selectedKey: 'service',
			selectedOperator: '=',
			selectedValues: [{ text: 'EC2', value: 'service0' }]
		}
	]

	return (
		<>
			<Button
				onClick={() => filtersRef.current?.setFiltersList(filtersList)}
			>
				Click to imperatively update the filtersList state
			</Button>
			<Filters {...args} filtersRef={filtersRef} />
		</>
	)
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
	api: createAxiosInstance(''),
	config: filtersConfig,
	emitter: new Emitter(),
	endpoint: 'https://mockendpoint.com',
	mode: FiltersMode.backend,
	omittedFilterKeys: ['name']
}
