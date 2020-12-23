import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { basicOptions, iconOptions } from './fixtures/sample_options'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { Select, SelectProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		value: { control: { disable: true } }
	},
	component: Select,
	title: 'Select'
} as Meta

const ThemedSelect: FC<SelectProps> = (props: SelectProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return <Select popupContainerSelector={popupContainerSelector} {...props} />
}

const Template: Story<SelectProps> = args => <ThemedSelect {...args} />

export const Default = Template.bind({})
Default.args = {
	options: basicOptions
}

export const Icon = Template.bind({})
Icon.args = {
	defaultValue: 'aws',
	options: iconOptions,
	placeholder: 'Choose a Cloud Provider'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	defaultValue: 'lorem',
	fullWidth: true,
	options: basicOptions
}

export const Search = Template.bind({})
Search.args = {
	options: iconOptions,
	placeholder: 'Choose a Cloud Provider',
	showSearch: true
}

export const SelectedOptionWidth = Template.bind({})
SelectedOptionWidth.args = {
	matchSelectedContentWidth: 50,
	options: basicOptions,
	placeholder: 'Choose a Cloud Provider',
	showSearch: true
}
