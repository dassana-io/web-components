import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Accordion, AccordionProps, Panel } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

const mockPanels: Panel[] = [
	{
		content: 'Lorem ipsum dolor sit amet.',
		key: 1,
		title: '1. Identify Vendor'
	},
	{
		content: 'Consectetur adipiscing elit.',
		headerRightContent: <FontAwesomeIcon icon={faCheckCircle} />,
		key: 2,
		title: '2. Map Policy'
	},
	{
		content:
			'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		key: 3,
		title: '3. Extract Resource Information'
	}
]

export default {
	argTypes: {
		panels: { control: { disable: true } }
	},
	component: Accordion,
	parameters: {
		// disabled because shallow rendering doesn't work with decorator and hook inside decorator.
		storyshots: { disable: true }
	},
	title: 'Accordion'
} as Meta

const Template: Story<AccordionProps> = args => (
	<Accordion {...args} panels={mockPanels} />
)

export const Default = Template.bind({})

export const Exclusive = Template.bind({})
Exclusive.args = {
	defaultExpandedKeys: [1],
	expandMultiple: false
}

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	expandAllOnMount: true
}
