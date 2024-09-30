import { placementOptions } from '../utils'
import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { InfoTip, type InfoTipProps } from './index'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC } from 'react'

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
		(PopoverStory: StoryFn) => (
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

const Template: StoryFn<InfoTipProps> = args => <ThemedInfoTip {...args} />

export const Default = Template.bind({})

Default.args = {
	content: 'Dassana'
}
