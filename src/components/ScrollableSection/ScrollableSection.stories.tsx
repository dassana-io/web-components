import { createUseStyles } from 'react-jss'
import React from 'react'
import { styleguide } from 'components/assets/styles'
import { Meta, Story } from '@storybook/react'
import { ScrollableSection, ScrollableSectionProps } from '.'

const { flexCenter } = styleguide

const useStyles = createUseStyles({
	children: {
		...flexCenter,
		height: '100%'
	},
	container: {
		height: 500
	}
})

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

const DecoratedSingleTemplate = (args: ScrollableSectionProps) => {
	const decoratedClasses = useStyles()

	return (
		<ScrollableSection {...args} classes={[decoratedClasses.container]}>
			<div className={decoratedClasses.children}>
				<div>pine</div>
				<div>apple</div>
			</div>
		</ScrollableSection>
	)
}

export const Single: Story<ScrollableSectionProps> =
	DecoratedSingleTemplate.bind({})
Single.args = {
	name: 'apple'
}
