import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ProgressBar, ProgressBarProps } from '.'

export default {
	argTypes: {
		classes: { control: { disable: true } }
	},
	component: ProgressBar,
	decorators: [
		(ProgressBarStory: Story) => (
			<div style={{ paddingTop: 150 }}>
				<ProgressBarStory />
			</div>
		)
	],
	title: 'ProgressBar'
} as Meta

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />

export const Default = Template.bind({})
