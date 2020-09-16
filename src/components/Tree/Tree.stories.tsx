import React from 'react'
import treeData0 from './fixtures/0_sample_data'
import { Meta, Story } from '@storybook/react/types-6-0'
import Tree, { TreeProps } from './index'

export default {
	argTypes: {
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
	title: 'Tree'
} as Meta

const Template: Story<TreeProps> = args => <Tree {...args} />

export const Default = Template.bind({})

Default.args = {
	treeData: treeData0
}
