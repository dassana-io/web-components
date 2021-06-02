import { action } from '@storybook/addon-actions'
import { Filters as FiltersType } from 'components/api'
import omit from 'lodash/omit'
import { api as createAxiosInstance, Emitter } from '@dassana-io/web-utils'
import { Filters, FiltersMode, FiltersProps } from '.'
import { filtersConfig, mockFilterOptions } from './fixtures/0_sample_data'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'

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
	const [value, setValue] = useState<FiltersType>([
		{ key: 'service', operator: '=', value: ['service0'] }
	])

	return (
		<Filters {...args} onSelectedFiltersChange={setValue} value={value} />
	)
}

export const ControlledFilters = ControlledTemplate.bind({})
ControlledFilters.args = {
	api: createAxiosInstance(''),
	config: filtersConfig,
	emitter: new Emitter(),
	endpoint: 'https://mockendpoint.com',
	mode: FiltersMode.backend,
	omittedFilterKeys: ['name']
}
