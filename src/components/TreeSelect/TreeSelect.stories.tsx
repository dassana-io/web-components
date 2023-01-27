import { action } from '@storybook/addon-actions'
import React from 'react'
import treeData0 from '../Tree/fixtures/0_sample_data'
import { Meta, Story } from '@storybook/react/types-6-0'
import { TreeSelect, TreeSelectProps } from './index'

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

const Template: Story<TreeSelectProps> = args => <TreeSelect {...args} />

export const Default = Template.bind({})

Default.args = {
	treeData: treeData0
}
