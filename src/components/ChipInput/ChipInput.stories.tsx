import { action } from '@storybook/addon-actions'
import React from 'react'
import { ChipInput, ChipInputProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

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

// This is for demo purposes only
const isValidDomain = (str: string) =>
	/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
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
