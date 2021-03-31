import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC, ReactNode } from 'react'
import { Timeline, TimelineConfig, TimelineProps } from './index'

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
	<div style={{ padding: `${18}px ${12}px` }}>{children}</div>
)

const headerIcon = <FontAwesomeIcon icon={faCheckCircle} />

const mockTimelineConfig: TimelineConfig[] = [
	{
		content: <Content>Content1</Content>,
		headerExtra: headerIcon,
		key: 1,
		title: 'Title 1'
	},
	{
		content: <Content>Content2</Content>,
		headerExtra: '2 hours ago',
		key: 2,
		title: 'Title 2'
	},
	{
		content: <Content>Content3</Content>,
		key: 3,
		title: 'Title 3',
		uncollapsible: true
	}
]

const Template: Story<TimelineProps> = args => (
	<Timeline {...args} timelineConfig={mockTimelineConfig} />
)

export const Default = Template.bind({})

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	expandAllOnMount: true
}
