import React from 'react'
import { basicOptions, basicOptionsDisabled } from './fixtures/sample_options'
import { Meta, Story } from '@storybook/react/types-6-0'
import RadioGroup, { RadioGroupProps } from './index'

export default {
	argTypes: {
		value: { control: { disable: true } }
	},
	component: RadioGroup,
	title: 'Radio Group'
} as Meta

const commonStoryProps = {
	/**
	 * Storybook automatically passes an onChange but not a value to RadioGroup, so the component won't work
	 * properly in the story. Passing undefined here ensures that RadioGroup is uncontrolled.
	 */
	onChange: undefined
}

const Template: Story<RadioGroupProps> = args => (
	<RadioGroup {...args} {...commonStoryProps} />
)

export const Default = Template.bind({})
Default.args = { options: basicOptions }

export const PartiallyDisabled = Template.bind({})
PartiallyDisabled.args = { options: basicOptionsDisabled }
