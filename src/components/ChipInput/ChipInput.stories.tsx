import { action } from '@storybook/addon-actions'
import React from 'react'
import { ChipInput, ChipInputProps } from './index'
import { Meta, Story } from '@storybook/react'

export default {
	argTypes: {
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		onChange: { defaultValue: action('onChange') }
	},
	title: 'ChipInput'
} as Meta

const Template: Story<ChipInputProps> = args => <ChipInput {...args} />

export const Default = Template.bind({})
Default.args = {
	defaultValues: ['@lorem.com', '@ipsum.com'],
	placeholder: '@yourdomain.com',
	undeleteableValues: ['@lorem.com']
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	fullWidth: true
}

const isValidDomain = (str: string) =>
	/^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		str
	)

export const ValidatedWithAddon = Template.bind({})
ValidatedWithAddon.args = {
	addonBefore: '@',
	defaultValues: ['@lorem.com', '@ipsum.com'],
	placeholder: 'yourdomain.com',
	undeleteableValues: ['@lorem.com'],
	validate: (inputVal: string) =>
		isValidDomain(inputVal) || 'Please enter a valid domain'
}

export const Loading = Template.bind({})
Loading.args = {
	loading: true
}
