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
		{ key: 0, label: 'CISCO' },
		{ key: 1, label: 'Sr Leadership' },
		{ key: 3, label: 'SecOps' },
		{ key: 4, label: 'Cloud Architect' },
		{ key: 5, label: 'DevOps' },
		{ key: 6, label: 'NetSec' },
		{ key: 7, label: 'AppDev' },
		{ key: 8, label: 'Compliance' },
		{ key: 9, label: 'Other' }
	]
}
