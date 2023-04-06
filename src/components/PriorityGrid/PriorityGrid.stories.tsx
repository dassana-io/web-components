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
