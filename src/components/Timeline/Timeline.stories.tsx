import { createUseStyles } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC, ReactNode } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'
import { Timeline, TimelineConfig, TimelineProps } from './index'

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

const { dark } = ThemeType

const {
	colors: { blacks }
} = styleguide

interface Props {
	children: ReactNode
}

const Content: FC<Props> = ({ children }: Props) => (
	<div style={{ padding: `${18}px ${12}px` }}>{children}</div>
)

const mockTimelineConfig: TimelineConfig[] = [
	{ content: <Content>Content1</Content>, key: 1, title: 'Title 1' },
	{ content: <Content>Content2</Content>, key: 2, title: 'Title 2' },
	{
		content: <Content>Content3</Content>,
		key: 3,
		title: 'Title 3',
		uncollapsible: true
	}
]

const useStyles = createUseStyles({
	tim: {
		border: `1px solid ${blacks['lighten-30']}`
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $tim': {
				border: `1px solid ${blacks['lighten-50']}`
			}
		}
	}
})

const Template: Story<TimelineProps> = args => {
	const classes = useStyles()

	return (
		<Timeline
			{...args}
			timelineConfig={[
				...args.timelineConfig.slice(0, 2),
				{ ...args.timelineConfig[2], classes: [classes.tim] }
			]}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	timelineConfig: [
		{
			...mockTimelineConfig[0],
			classes: ['timeline-test'],
			timestamp: 1617130453798
		},
		...mockTimelineConfig.slice(1)
	]
}

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	expandAllOnMount: true,
	timelineConfig: mockTimelineConfig
}
