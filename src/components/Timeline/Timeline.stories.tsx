import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Timeline, TimelineConfig, TimelineProps } from './index'

const mockTimelineConfig: TimelineConfig[] = [
	{ content: 'Content1', key: 1, title: 'Title 1' },
	{ content: 'Content2', key: 2, timestamp: 1617130453798, title: 'Title 2' },
	{ content: 'Content3', key: 3, title: 'Title 3', uncollapsible: true }
]

export default {
	argTypes: {
		panels: { control: { disable: true } }
	},
	component: Timeline,
	parameters: {
		// disabled because shallow rendering doesn't work with decorator and hook inside decorator.
		storyshots: { disable: true }
	},
	title: 'Timeline'
} as Meta

const Template: Story<TimelineProps> = args => (
	<Timeline {...args} timelineConfig={mockTimelineConfig} />
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
