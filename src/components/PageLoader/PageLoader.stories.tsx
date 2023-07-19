import { PageLoader } from './index'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'

export default {
	component: PageLoader,
	title: 'PageLoader'
} as Meta

const Template: Story = args => <PageLoader {...args} />

export const Default = Template.bind({})
