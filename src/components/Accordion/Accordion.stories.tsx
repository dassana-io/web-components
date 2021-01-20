import React from 'react'
import { Accordion, AccordionProps, Panel } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'

const mockPanels: Panel[] = [
	{ content: 'Content1', key: 1, title: 'Title 1' },
	{ content: 'Content2', key: 2, title: 'Title 2' },
	{ content: 'Content3', key: 3, title: 'Title 3' }
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
	exclusive: true
}

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	expandAllOnMount: true
}
