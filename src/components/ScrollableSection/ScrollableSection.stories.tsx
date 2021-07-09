import { Button } from 'components/Button'
import { createUseStyles } from 'react-jss'
import React from 'react'
import { styleguide } from 'components/assets/styles'
import { Meta, Story } from '@storybook/react'
import { ScrollableSection, ScrollableSectionProps } from '.'
import { ScrollDirections, scrollOnClick } from './utils'

const { flexCenter } = styleguide

const { down } = ScrollDirections

const useStyles = createUseStyles({
	children: {
		...flexCenter,
		height: '100%'
	},
	multiContainer: {
		height: '100vh'
	},
	singleContainer: {
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
		<ScrollableSection
			{...args}
			classes={[decoratedClasses.singleContainer]}
		>
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

const multiConfig = [
	{
		arrowDown: true,
		arrowUp: false,
		name: 'apple',
		sections: sectionsMockData
	},
	{
		arrowDown: true,
		arrowUp: true,
		name: 'pineapple',
		sections: sectionsMockData
	},
	{
		arrowDown: false,
		arrowUp: true,
		name: 'mango',
		sections: sectionsMockData
	}
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const DecoratedMultipleTemplate = () => {
	const decoratedClasses = useStyles()

	return (
		<div>
			{multiConfig.map((section, i) => (
				<ScrollableSection
					classes={[decoratedClasses.multiContainer]}
					key={i}
					{...section}
				>
					<div className={decoratedClasses.children}>
						{section.name}
					</div>
				</ScrollableSection>
			))}
		</div>
	)
}

export const Multiple = DecoratedMultipleTemplate.bind({})

const DecoratedScrollTemplate = () => {
	const decoratedClasses = useStyles()

	const scrollConfig = [
		{
			arrowDown: false,
			arrowUp: false,
			name: 'apple',
			render: () => (
				<div className={decoratedClasses.children}>
					<Button
						onClick={() =>
							scrollOnClick(sectionsMockData, down, 'apple')
						}
					>
						Next Section
					</Button>
				</div>
			),
			sections: sectionsMockData
		},
		{
			arrowDown: false,
			arrowUp: true,
			name: 'pineapple',
			render: () => (
				<div className={decoratedClasses.children}>
					<div>pineapple</div>
				</div>
			),
			sections: sectionsMockData
		}
	]

	return (
		<div className={decoratedClasses.multiContainer}>
			{scrollConfig.map((args, i) => (
				<ScrollableSection
					classes={[decoratedClasses.multiContainer]}
					key={i}
					{...args}
				>
					{args.render()}
				</ScrollableSection>
			))}
		</div>
	)
}

export const ScrollWithoutArrow = DecoratedScrollTemplate.bind({})
