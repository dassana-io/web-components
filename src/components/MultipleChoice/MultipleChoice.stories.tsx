import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultipleChoice, MultipleChoiceProps } from './index'
import React, { FC } from 'react'

export default {
	argTypes: {
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } }
	},
	decorators: [
		(MultiChoiceStory: Story) => (
			<div style={{ padding: 60 }}>
				<MultiChoiceStory />
			</div>
		)
	],
	title: 'MultipleChoice'
} as Meta

const ThemedMultiChoice: FC<MultipleChoiceProps> = (
	props: MultipleChoiceProps
) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<MultipleChoice
			popupContainerSelector={popupContainerSelector}
			{...props}
		/>
	)
}

const Template: Story<MultipleChoiceProps> = args => (
	<ThemedMultiChoice {...args} />
)

export const Default = Template.bind({})
Default.args = {
	items: [
		{ key: 0, label: 'CISCO' },
		{ key: 1, label: 'Sr Leadership' },
		{ key: 3, label: 'SecOps' },
		{ key: 4, label: 'Cloud Architect' },
		{ key: 5, label: 'DevOps' },
		{ key: 6, label: 'NetSec' },
		{ key: 7, label: 'AppDev' },
		{ key: 8, label: 'Compliance' },
		{ key: 9, label: 'Other' }
	]
}
