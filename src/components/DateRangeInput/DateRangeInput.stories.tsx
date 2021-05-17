import React from 'react'
import { DateRangeInput, DateRangeInputProps } from '.'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	component: DateRangeInput,
	title: 'DateRangeInput'
} as Meta

const Template: Story<DateRangeInputProps> = args => (
	<DateRangeInput {...args} />
)

export const Default = Template.bind({})
Default.args = {}
