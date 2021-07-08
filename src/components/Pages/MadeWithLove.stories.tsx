import MadeWithLove from './MadeWithLove'
import React from 'react'
import { Meta, Story } from '@storybook/react'

export default {
	component: MadeWithLove,
	title: 'Made With Love'
} as Meta

const Template: Story = () => <MadeWithLove />

export const WithLove = Template.bind({})
