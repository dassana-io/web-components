import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ScrollableSection, ScrollableSectionProps } from '.'

const sectionsMockData = ['apple', 'pineapple', 'mango']

export default {
	argTypes: {
		children: { control: { disable: true } },
		class: { control: 'array' }
	},
	args: {
		sections: sectionsMockData
	},
	component: ScrollableSection,
	title: 'ScrollableSection'
} as Meta

const SingleTemplate: Story<ScrollableSectionProps> = args => (
	<ScrollableSection {...args}>
		<div>hello</div>
	</ScrollableSection>
)

export const Single = SingleTemplate.bind({})
Single.args = {
	name: 'apple'
}
