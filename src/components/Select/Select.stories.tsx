import { action } from '@storybook/addon-actions'
import React from 'react'
import { basicOptions, iconOptions } from './fixtures/sample_options'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Select, SelectProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: Select,
	title: 'Select'
} as Meta

const Template: Story<SelectProps> = args => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
	options: basicOptions
}

export const Icon = Template.bind({})
Icon.args = {
	defaultValue: 'aws',
	options: iconOptions,
	placeholder: 'Choose a Cloud Provider'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	defaultValue: 'lorem',
	fullWidth: true,
	options: basicOptions
}

export const Search = Template.bind({})
Search.args = {
	options: iconOptions,
	placeholder: 'Choose a Cloud Provider',
	showSearch: true
}
