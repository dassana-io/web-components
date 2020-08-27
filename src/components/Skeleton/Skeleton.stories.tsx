import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Skeleton, { SkeletonProps } from './index'

export default {
	component: Skeleton,
	title: 'Skeleton'
} as Meta

const Template: Story<SkeletonProps> = args => <Skeleton {...args} />

export const Default = Template.bind({})

export const Circle = Template.bind({})
Circle.args = { circle: true, height: 50, width: 50 }

export const Count = Template.bind({})
Count.args = { count: 5, width: 300 }
