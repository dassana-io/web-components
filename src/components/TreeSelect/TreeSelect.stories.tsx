import { action } from '@storybook/addon-actions'
import { type SbTheme } from '../../../.storybook/preview'
import treeData0 from '../Tree/fixtures/0_sample_data'
import { useTheme } from 'react-jss'
import { type Meta, type StoryFn } from '@storybook/react'
import React, { type FC } from 'react'
import { TreeSelect, type TreeSelectProps } from './index'

export default {
	argTypes: {
		onChange: {
			control: { disable: true },
			defaultValue: action('onChange')
		},
		treeData: {
			table: {
				type: {
					detail: `interface TreeNodeType {
  id: string | number
  name: string
  children?: TreeNodeType[]
}
         `
				}
			}
		}
	},
	component: TreeSelect,
	parameters: {
		// disabled because shallow rendering doesn't work with decorator and hook inside decorator.
		storyshots: { disable: true }
	},
	title: 'TreeSelect'
} as Meta

const ThemedTreeSelect: FC<TreeSelectProps> = (props: TreeSelectProps) => {
	const theme: SbTheme = useTheme()

	const popupContainerSelector = `.${theme.type}`

	return (
		<TreeSelect
			popupContainerSelector={popupContainerSelector}
			{...props}
		/>
	)
}

const Template: StoryFn<TreeSelectProps> = args => (
	<ThemedTreeSelect {...args} />
)

export const Default = Template.bind({})

Default.args = {
	treeData: treeData0
}
