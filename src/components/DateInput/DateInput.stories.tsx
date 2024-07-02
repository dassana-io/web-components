import { action } from '@storybook/addon-actions'
import moment from 'moment'
import { type SbTheme } from '../../../.storybook/preview'
import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { useTheme } from 'react-jss'
import { DateInput, type DateInputProps } from '.'
import { type Meta, type Story } from '@storybook/react'
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
	component: DateInput,
	decorators: [SecondaryBgDecorator],
	title: 'DateInput'
} as Meta

const ThemedDateInput: FC<DateInputProps> = (
	props: DateInputProps
) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<DateInput
			{...props}
			popupContainerSelector={popupContainerSelector}
		/>
	)
}

const Template: Story<DateInputProps> = args => (
	<ThemedDateInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
	disabledDate: current => {
		return current && current > moment().endOf('day')
	}
}
