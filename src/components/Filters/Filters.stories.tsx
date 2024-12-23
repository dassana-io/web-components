import { action } from '@storybook/addon-actions'
import { Button } from 'components/Button'
import omit from 'lodash/omit'
import { Filters, FiltersMode, type FiltersProps } from '.'
import { filtersConfig, mockFilterOptions } from './fixtures/0_sample_data'
import { type FiltersList, type UseFiltersMethods } from './types'
import { type Meta, type StoryFn } from '@storybook/react'
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

const Template: StoryFn<FiltersProps> = args => <Filters {...args} />

export const Default = Template.bind({})
Default.args = {
	config: filtersConfig,
	mode: FiltersMode.backend,
	omittedFilterKeys: ['name'],
	onFilterSuggest: () => mockFilterOptions as any,
	onFiltersFetch: () => mockFilterOptions as any
}

export const ClientSide = Template.bind({})
ClientSide.args = {
	config: filtersConfig,
	filterOptions: mockFilterOptions.map(filter =>
		omit(filter, ['staticFilter', 'operator'])
	),
	mode: FiltersMode.frontend
}

const ControlledTemplate: StoryFn<FiltersProps> = args => {
	const filtersRef = useRef<UseFiltersMethods>(null)

	const filtersList: FiltersList = [
		{
			id: 'some-id',
			selectedKey: 'key0',
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
	config: filtersConfig,
	mode: FiltersMode.backend,
	omittedFilterKeys: ['name'],
	onFilterSuggest: () => mockFilterOptions as any,
	onFiltersFetch: () => mockFilterOptions as any
}
