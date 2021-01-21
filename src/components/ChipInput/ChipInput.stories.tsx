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
	placeholder: '@yourdomain.com'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	fullWidth: true
}
