import { action } from '@storybook/addon-actions'
import omit from 'lodash/omit'
import React from 'react'
import { api as createAxiosInstance, Emitter } from '@dassana-io/web-utils'
import { Filters, FiltersMode, FiltersProps } from '.'
import { filtersConfig, mockFilterOptions } from './fixtures/0_sample_data'
import { Meta, Story } from '@storybook/react/types-6-0'

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
