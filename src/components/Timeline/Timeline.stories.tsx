import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC, type ReactNode } from 'react'
import { Timeline, type TimelineConfig, type TimelineProps } from './index'

export default {
	argTypes: {
		timelineConfig: { control: { disable: true } }
	},
	component: Timeline,
	parameters: {
		// disabled because shallow rendering doesn't work with decorator and hook inside decorator.
		storyshots: { disable: true }
	},
	title: 'Timeline'
} as Meta

interface Props {
	children: ReactNode
}

const Content: FC<Props> = ({ children }: Props) => (
	<div style={{ padding: '18px 12px' }}>{children}</div>
)

const mockTimelineConfig: TimelineConfig[] = [
	{
		content: <Content>Content1</Content>,
		headerRightContent: <FontAwesomeIcon icon={faCheckCircle} />,
		key: 1,
		title: 'Title 1'
	},
	{
		alwaysExpanded: true,
		content: <Content>Content2</Content>,
		headerRightContent: '2 hours ago',
		key: 2,
		title: 'Title 2'
	},
	{
		content: <Content>Content3</Content>,
		key: 3,
		title: 'Title 3'
	}
]

const Template: StoryFn<TimelineProps> = args => (
	<Timeline {...args} timelineConfig={mockTimelineConfig} />
)

export const Default = Template.bind({})

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	activeKey: 1,
	expandAllOnMount: true
}
