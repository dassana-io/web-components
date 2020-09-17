import { action } from '@storybook/addon-actions'
import React from 'react'
import { basicOptions, basicOptionsDisabled } from './fixtures/sample_options'
import { Meta, Story } from '@storybook/react/types-6-0'
import RadioGroup, { RadioGroupProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: RadioGroup,
	title: 'Radio Group'
} as Meta

const Template: Story<RadioGroupProps> = args => <RadioGroup {...args} />

export const Default = Template.bind({})
Default.args = { options: basicOptions }

export const PartiallyDisabled = Template.bind({})
PartiallyDisabled.args = { options: basicOptionsDisabled }
