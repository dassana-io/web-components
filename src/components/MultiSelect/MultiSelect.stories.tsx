import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultiSelect, MultiSelectOptions, MultiSelectProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: MultiSelect,
	title: 'MultiSelect'
} as Meta

const basicOptions: MultiSelectOptions[] = [
	{ text: 'Lorem', value: '0' },
	{ text: 'Ipsum', value: '1' },
	{ text: 'Dolor', value: '3' },
	{ text: 'Sit', value: '4' },
	{ text: 'Amet', value: '5' }
]

const Template: Story<MultiSelectProps> = args => <MultiSelect {...args} />

export const Default = Template.bind({})
Default.args = {
	options: basicOptions
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	defaultValues: ['lorem', 'ipsum'],
	fullWidth: true,
	options: basicOptions
}
