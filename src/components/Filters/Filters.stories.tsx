import { action } from '@storybook/addon-actions'
import { filtersConfig } from './fixtures/0_sample_data'
import React from 'react'
import { api as createAxiosInstance, Emitter } from '@dassana-io/web-utils'
import { Filters, FiltersProps } from '.'
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
	endpoint: 'https://mockendpoint.com'
}
