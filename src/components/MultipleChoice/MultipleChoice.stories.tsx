import { action } from '@storybook/addon-actions'
import { SbTheme } from '../../../.storybook/preview'
import { themedModalStyles } from 'components/Modal/utils'
import { useTheme } from 'react-jss'
import { Meta, Story } from '@storybook/react/types-6-0'
import { MultipleChoice, MultipleChoiceProps } from './index'
import React, { FC } from 'react'

export default {
	argTypes: {
		loading: { control: 'boolean' },
		onChange: { defaultValue: action('onChange') },
		popupContainerSelector: { control: { disable: true } },
		skeletonItemCount: { control: 'number' }
	},
	decorators: [
		(MultiChoiceStory: Story) => {
			const theme: SbTheme = useTheme()

			return (
				<div style={{ ...themedModalStyles(theme.type), padding: 60 }}>
					<MultiChoiceStory />
				</div>
			)
		}
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

const items = [
	'CISCO',
	'Sr Leadership',
	'SecOps',
	'Cloud Architect',
	'DevOps',
	'NetSec',
	'AppDev',
	'Compliance',
	'Other'
]

const multichoiceItems = items.map(item => ({
	key: item.toLowerCase().split(' ').join('-'),
	label: item
}))

export const Default = Template.bind({})
Default.args = {
	defaultSelectedKeys: ['sr-leadership', 'devops'],
	items: multichoiceItems
}
