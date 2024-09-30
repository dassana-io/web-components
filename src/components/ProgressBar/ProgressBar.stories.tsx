import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'
import { ProgressBar, type ProgressBarProps } from '.'

export default {
	argTypes: {
		classes: { control: { disable: true } }
	},
	component: ProgressBar,
	decorators: [
		(ProgressBarStory: StoryFn) => (
			<div style={{ paddingTop: 150 }}>
				<ProgressBarStory />
			</div>
		)
	],
	title: 'ProgressBar'
} as Meta

const Template: StoryFn<ProgressBarProps> = args => <ProgressBar {...args} />

export const Default = Template.bind({})
