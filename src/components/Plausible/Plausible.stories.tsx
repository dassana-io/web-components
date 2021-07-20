import { Plausible } from '.'
import React from 'react'
import { Meta, Story } from '@storybook/react'

export default {
	component: Plausible,
	title: 'Plausible'
} as Meta

const Template: Story = () => <Plausible />

export const DisablePlausible = Template.bind({})
