import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { type SbTheme } from '../../../.storybook/preview'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { useTheme } from 'react-jss'
import { DateRangeInput, type DateRangeInputProps } from '.'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC } from 'react'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		size: {
			defaultValue: 'middle',
			options: ['small', 'middle', 'large']
		},
		value: { control: { disable: true } }
	},
	component: DateRangeInput,
	decorators: [SecondaryBgDecorator],
	title: 'DateRangeInput'
} as Meta

const ThemedDateRangeInput: FC<DateRangeInputProps> = (
	props: DateRangeInputProps
) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<DateRangeInput
			{...props}
			popupContainerSelector={popupContainerSelector}
		/>
	)
}

const Template: StoryFn<DateRangeInputProps> = args => (
	<ThemedDateRangeInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
	disabledDate: current => {
		return current && current > moment().endOf('day')
	}
}
