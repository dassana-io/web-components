import { SecondaryBgDecorator } from '../../../.storybook/utils'
import { FiltersV2, FiltersV2Props } from './index'
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'

export default {
	argTypes: {},
	component: FiltersV2,
	decorators: [SecondaryBgDecorator],
	title: 'FiltersV2'
} as Meta

const Template: Story<FiltersV2Props> = args => <FiltersV2 {...args} />

export const Default = Template.bind({})

Default.args = {
	filterConfig: { filterGroups: [] }
}
