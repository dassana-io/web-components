import { PriorityGrid } from '.'
import React from 'react'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'

export default {
	argTypes: {
		classes: { control: { disable: true } }
	},
	component: PriorityGrid,
	decorators: [
		(PriorityGridStory: Story) => (
			<div style={{ paddingTop: 150 }}>
				<PriorityGridStory />
			</div>
		)
	],
	title: 'Priority Grid'
} as Meta

const ThemedPriorityGrid = () => {
	useTheme()

	return (
		<PriorityGrid
			countData={{
				medium: {
					low: 26570,
					high: 69412,
					medium: 7,
					critical: 1
				},
				critical: {
					high: 136,
					low: 172
				},
				high: {
					high: 556,
					low: 860
				},
				low: {
					high: 128,
					low: 155
				}
			}}
			criticalityFilters={[]}
			gridItemFilters={[]}
			handleItemClick={() => console.log('click')}
			priorityFilters={[]}
			severityFilters={[]}
		/>
	)
}

const Template: Story = () => <ThemedPriorityGrid />

export const Default = Template.bind({})
