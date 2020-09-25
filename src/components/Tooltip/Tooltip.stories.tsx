import Icon from '../Icon'
import { placementOptions } from '../utils'
import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tooltip, { TooltipProps } from './index'

export default {
	argTypes: {
		children: { control: { disable: true } },
		placement: {
			control: {
				options: placementOptions,
				type: 'select'
			}
		},
		title: { control: { type: 'text' } }
	},
	component: Tooltip,
	title: 'Tooltip'
} as Meta

const Template: Story<TooltipProps> = args => (
	<div style={{ padding: 75 }}>
		<Tooltip {...args}>
			<Icon iconKey='dassana' />
		</Tooltip>
	</div>
)

export const Default = Template.bind({})
Default.args = {
	title: 'Dassana'
}
