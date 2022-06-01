import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../../.storybook/preview'
import { SecondaryBgDecorator } from '../../../../.storybook/utils'
import { SelectOption } from '../SingleSelect/types'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { TagsSelect, TagsSelectProps } from './index'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		values: { control: { disable: true } }
	},
	component: TagsSelect,
	decorators: [SecondaryBgDecorator],
	parameters: {
		// disabled because shallow rendering gives warning, but TagsSelect only works with shallow render
		storyshots: { disable: true }
	},
	title: 'TagsSelect'
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

const ThemedTagsSelect: FC<TagsSelectProps> = (props: TagsSelectProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<TagsSelect
			popupContainerSelector={popupContainerSelector}
			{...props}
		/>
	)
}

const Template: Story<TagsSelectProps> = args => <ThemedTagsSelect {...args} />

export const Default = Template.bind({})
Default.args = {
	options: basicOptions,
	placeholder: 'Pls select'
}
