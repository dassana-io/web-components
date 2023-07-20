import { Icon } from '../Icon'
import { placementOptions } from '../utils'
import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { type Meta, type Story } from '@storybook/react'
import React, { type FC } from 'react'
import { Tooltip, type TooltipProps } from './index'

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
	decorators: [
		(PopoverStory: Story) => (
			<div style={{ padding: 75 }}>
				<PopoverStory />
			</div>
		)
	],
	title: 'Tooltip'
} as Meta

const ThemedTooltip: FC<TooltipProps> = (props: TooltipProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<Tooltip popupContainerSelector={popupContainerSelector} {...props}>
			<Icon iconKey='dassana' />
		</Tooltip>
	)
}

const Template: Story<TooltipProps> = args => <ThemedTooltip {...args} />

export const Default = Template.bind({})

Default.args = {
	title: 'Dassana'
}
