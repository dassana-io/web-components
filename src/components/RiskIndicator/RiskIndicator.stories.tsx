import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'
import { RiskIndicator, type RiskIndicatorProps, RiskRank } from '.'

const { Critical, High, Low, Medium, Accepted } = RiskRank

export default {
	argTypes: {
		risk: {
			control: {
				options: [Critical, High, Low, Medium, Accepted, undefined],
				type: 'select'
			}
		}
	},
	component: RiskIndicator,
	title: 'RiskIndicator'
} as Meta

const Template: StoryFn<RiskIndicatorProps> = args => (
	<RiskIndicator {...args} />
)

export const Default = Template.bind({})
