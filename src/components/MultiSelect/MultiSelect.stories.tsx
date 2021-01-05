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
	parameters: {
		// disabled because shallow rendering gives warning, but FormTree only works with shallow render
		storyshots: { disable: true }
	},
	title: 'MultiSelect'
} as Meta

const basicOptions: MultiSelectOption[] = [
	{ text: 'Lorem', value: '0' },
	{ text: 'Incididunt', value: '1' },
	{ text: 'Ipsum', value: '2' },
	{ text: 'Dolor', value: '3' },
	{ text: 'Sit', value: '4' },
	{ text: 'Amet', value: '5' },
	{ text: 'Consectetur', value: '6' },
	{ text: 'LonglonglonglonglonglonglonglonglonglonglonglongMan', value: '7' }
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
	options: basicOptions,
	placeholder: 'Pls select'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	fullWidth: true,
	options: basicOptions
}

export const Search = Template.bind({})
Search.args = {
	options: basicOptions,
	searchPlaceholder: 'Search...',
	showSearch: true
}

export const SelectedContentWidth = Template.bind({})
SelectedContentWidth.args = {
	matchSelectedContentWidth: 125,
	maxTagCount: 5,
	options: basicOptions,
	showSearch: true
}
