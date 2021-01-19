import { action } from '@storybook/addon-actions'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultipleChoice, MultipleChoiceProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') }
	},
	title: 'MultipleChoice'
} as Meta

const Template: Story<MultipleChoiceProps> = args => (
	<MultipleChoice {...args} />
)

export const Default = Template.bind({})
Default.args = {
	items: [
		{ key: 0, label: 'Lorem' },
		{ key: 1, label: 'Ipsum' },
		{ key: 3, label: 'Dolor' }
	]
}
