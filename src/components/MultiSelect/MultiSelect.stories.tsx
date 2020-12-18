import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultiSelect, MultiSelectOption, MultiSelectProps } from './index'
import React, { FC } from 'react'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		values: { control: { disable: true } }
	},
	component: MultiSelect,
	title: 'MultiSelect'
} as Meta

const basicOptions: MultiSelectOption[] = [
	{ text: 'Lorem', value: '0' },
	{ text: 'Ipsum', value: '1' },
	{ text: 'Dolor', value: '2' },
	{ text: 'Sit', value: '3' },
	{ text: 'Amet', value: '4' },
	{ text: 'Consectetur', value: '5' }
]

const ThemedMultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<MultiSelect
			popupContainerSelector={popupContainerSelector}
			{...props}
		/>
	)
}

const Template: Story<MultiSelectProps> = args => (
	<ThemedMultiSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
	options: basicOptions
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	fullWidth: true,
	options: basicOptions
}
