import React from 'react'
import InputField, { InputFieldProps } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		classes: { control: 'array' },
		value: { control: { disable: true } }
	},
	component: InputField,
	title: 'InputField'
} as Meta

const Template: Story<InputFieldProps> = args => <InputField {...args} />

export const Default = Template.bind({})

export const Label = Template.bind({})
Label.args = { fieldLabel: 'Field Label' }

export const Loading = Template.bind({})
Loading.args = { fieldLabel: 'Field Label', loading: true }

export const FullWidth = Template.bind({})
Loading.args = { fieldLabel: 'Field Label', fullWidth: true }
