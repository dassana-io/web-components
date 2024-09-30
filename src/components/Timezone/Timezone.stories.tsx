import { action } from '@storybook/addon-actions'
import { type SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC } from 'react'
import { Timezone, type TimezoneProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		value: { control: { disable: true } }
	},
	component: Timezone,
	parameters: {
		// disabled because default timezone will differ based on where the snapshots were created
		storyshots: { disable: true }
	},
	title: 'Timezone'
} as Meta

const ThemedTimezone: FC<TimezoneProps> = (props: TimezoneProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<Timezone popupContainerSelector={popupContainerSelector} {...props} />
	)
}

const Template: StoryFn<TimezoneProps> = args => <ThemedTimezone {...args} />

export const Default = Template.bind({})
Default.args = {}
