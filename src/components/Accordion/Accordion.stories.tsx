import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styleguide } from 'components/assets/styles'
import { Accordion, type AccordionProps, type Panel } from './index'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC, type ReactNode } from 'react'

const { font, spacing } = styleguide

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

interface Props {
	children: ReactNode
}

const Content: FC<Props> = ({ children }: Props) => (
	<div
		style={{
			...font.body,
			padding: spacing.m,
			paddingTop: 0
		}}
	>
		{children}
	</div>
)

const mockPanels: Panel[] = [
	{
		content: <Content>Lorem ipsum dolor sit amet.</Content>,
		key: 1,
		title: '1. Identify Vendor'
	},
	{
		content: <Content>Consectetur adipiscing elit.</Content>,
		headerRightContent: <FontAwesomeIcon icon={faCheckCircle} />,
		key: 2,
		title: '2. Map Policy'
	},
	{
		content: (
			<Content>
				Sed do eiusmod tempor incididunt ut labore et dolore magna
				aliqua.
			</Content>
		),
		key: 3,
		title: '3. Extract Resource Information'
	}
]

const Template: StoryFn<AccordionProps> = args => (
	<Accordion {...args} panels={mockPanels} />
)

export const Default = Template.bind({})

export const ExpandOneAtATime = Template.bind({})
ExpandOneAtATime.args = {
	defaultExpandedKeys: [1],
	expandMultiple: false
}

export const ExpandAll = Template.bind({})
ExpandAll.args = {
	expandAllOnMount: true
}
