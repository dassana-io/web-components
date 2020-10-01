import { action } from '@storybook/addon-actions'
import React from 'react'
import treeData0 from './fixtures/0_sample_data'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tree, { TreeProps } from './index'

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
	component: Tree,
	parameters: {
		// disabled because shallow rendering doesn't work with decorator and hook inside decorator.
		storyshots: { disable: true }
	},
	title: 'Tree'
} as Meta

const Template: Story<TreeProps> = args => <Tree {...args} />

export const Default = Template.bind({})

Default.args = {
	treeData: treeData0
}
