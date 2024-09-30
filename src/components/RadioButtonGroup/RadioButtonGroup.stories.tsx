import React from 'react'
import { basicOptions, basicOptionsDisabled } from './fixtures/sample_options'
import { type Meta, type StoryFn } from '@storybook/react'
import { RadioButtonGroup, type RadioButtonGroupProps } from './index'

export default {
	argTypes: {
		value: { control: { disable: true } }
	},
	component: RadioButtonGroup,
	title: 'Radio Button Group'
} as Meta

const commonStoryProps = {
	/**
	 * Storybook automatically passes an onChange but not a value to RadioButtonGroup, so the component won't work
	 * properly in the story. Passing undefined here ensures that RadioButtonGroup is uncontrolled.
	 */
	onChange: undefined
}

const Template: StoryFn<RadioButtonGroupProps> = args => (
	<RadioButtonGroup {...args} {...commonStoryProps} />
)

export const Default = Template.bind({})
Default.args = { options: basicOptions }

export const PartiallyDisabled = Template.bind({})
PartiallyDisabled.args = { options: basicOptionsDisabled }

export const Loading = Template.bind({})
Loading.args = { loading: true, options: basicOptions }
