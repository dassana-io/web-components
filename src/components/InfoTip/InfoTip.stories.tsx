import { placementOptions } from '../utils'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { InfoTip, InfoTipProps } from './index'
import { Meta, Story } from '@storybook/react'
import React, { FC } from 'react'

export default {
	argTypes: {
		content: { control: { type: 'text' } },
		placement: {
			control: {
				options: placementOptions,
				type: 'select'
			}
		}
	},
	component: InfoTip,
	decorators: [
		(PopoverStory: Story) => (
			<div style={{ padding: 75 }}>
				<PopoverStory />
			</div>
		)
	],
	title: 'InfoTip'
} as Meta

const ThemedInfoTip: FC<InfoTipProps> = (props: InfoTipProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<InfoTip {...props} popupContainerSelector={popupContainerSelector} />
	)
}

const Template: Story<InfoTipProps> = args => <ThemedInfoTip {...args} />

export const Default = Template.bind({})

Default.args = {
	content: 'Dassana'
}
