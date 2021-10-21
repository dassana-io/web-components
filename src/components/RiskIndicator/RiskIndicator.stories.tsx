import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { RiskIndicator, RiskIndicatorProps, RiskRank } from '.'

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

const Template: Story<RiskIndicatorProps> = args => <RiskIndicator {...args} />

export const Default = Template.bind({})
