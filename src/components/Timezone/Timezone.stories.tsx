import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react'
import React, { FC } from 'react'
import { Timezone, TimezoneProps } from './index'

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

const Template: Story<TimezoneProps> = args => <ThemedTimezone {...args} />

export const Default = Template.bind({})
Default.args = {}
