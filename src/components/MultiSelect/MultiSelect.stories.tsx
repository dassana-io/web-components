import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { createUseStyles, useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultiSelect, MultiSelectOption, MultiSelectProps } from './index'
import React, { FC } from 'react'
import { styleguide, themes, ThemeType } from 'components/assets/styles'

const { spacing } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	decorator: {
		background: themes[light].background.secondary,
		height: `calc(100vh - ${spacing.m * 2}px)`,
		padding: spacing.l,
		width: '100%'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $decorator': {
				background: themes[dark].background.secondary
			}
		}
	}
})

const Decorator = (MultiSelectStory: Story) => {
	const classes = useStyles()

	return (
		<div className={classes.decorator}>
			<MultiSelectStory />
		</div>
	)
}

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		values: { control: { disable: true } }
	},
	component: MultiSelect,
	decorators: [Decorator],
	title: 'MultiSelect'
} as Meta

const basicOptions: MultiSelectOption[] = [
	{ text: 'Lorem', value: '0' },
	{ text: 'Incididunt', value: '1' },
	{ text: 'Ipsum', value: '2' },
	{ text: 'Dolor', value: '3' },
	{ text: 'Sit', value: '4' },
	{ text: 'Amet', value: '5' },
	{ text: 'Consectetur', value: '6' }
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

export const Search = Template.bind({})
Search.args = {
	options: basicOptions,
	searchPlaceholder: 'Search...',
	showSearch: true
}
