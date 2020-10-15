import { Icon } from '../Icon'
import { placementOptions } from '../utils'
import { SbTheme } from '../../../.storybook/preview'
import { ThemeType } from 'components/assets/styles/themes'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { Tooltip, TooltipProps } from './index'

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

const { dark, light } = ThemeType

const ThemedTooltip: FC<TooltipProps> = (props: TooltipProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector =
		theme.type === dark ? `.${dark}` : `.${light}`
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
