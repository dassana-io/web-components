import { action } from '@storybook/addon-actions'
import { iconOptions } from '../fixtures/sample_options'
import { SbTheme } from '../../../../.storybook/preview'
import { SecondaryBgDecorator } from '../../../../.storybook/utils'
import { SelectOption } from '../SingleSelect/types'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultiSelect, MultiSelectProps } from './index'
import React, { FC } from 'react'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		values: { control: { disable: true } }
	},
	component: MultiSelect,
	decorators: [SecondaryBgDecorator],
	parameters: {
		// disabled because shallow rendering gives warning, but MultiSelect only works with shallow render
		storyshots: { disable: true }
	},
	title: 'MultiSelect'
} as Meta

const basicOptions: SelectOption[] = [
	{ text: 'Lorem', value: '0' },
	{ text: 'Incididunt', value: '1' },
	{ text: 'Ipsum', value: '2' },
	{ text: 'Dolor', value: '3' },
	{ text: 'Sit', value: '4' },
	{ text: 'Amet', value: '5' },
	{ text: 'Consectetur', value: '6' },
	{ text: 'Adipiscing elit sed do eiusmod', value: '7' },
	{ text: 'consectetur', value: '8' }
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

export const Search = Template.bind({})
Search.args = {
	defaultValues: ['0'],
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

export const FullWidth = Template.bind({})
FullWidth.args = {
	fullWidth: true,
	options: basicOptions
}

export const Icon = Template.bind({})
Icon.args = {
	options: iconOptions,
	optionsConfig: {
		iconMap: {
			aws: 'https://dummyimage.com/400x400/ff9900/fff&text=A',
			azure: 'https://dummyimage.com/400x400/0072c6/fff&text=A'
		}
	}
}
