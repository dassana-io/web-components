import Icon from '../Icon'
import React from 'react'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tooltip, { TooltipProps } from './index'

const placementOptions: TooltipPlacement[] = [
	'bottom',
	'bottomLeft',
	'bottomRight',
	'left',
	'leftBottom',
	'leftTop',
	'right',
	'rightBottom',
	'rightTop',
	'top',
	'topLeft',
	'topRight'
]

export default {
	argTypes: {
		children: { control: { disable: true } },
		placement: {
			control: {
				options: placementOptions,
				type: 'select'
			},
			defaultValue: 'right'
		}
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
