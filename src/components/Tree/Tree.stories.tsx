import { action } from '@storybook/addon-actions'
import React from 'react'
import treeData0 from './fixtures/0_sample_data'
import { type Meta, type StoryFn } from '@storybook/react'
import { Tree, type TreeProps } from './index'

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

const Template: StoryFn<TreeProps> = args => <Tree {...args} />

export const Default = Template.bind({})

Default.args = {
	checkable: false,
	selectable: true,
	treeData: treeData0
}
