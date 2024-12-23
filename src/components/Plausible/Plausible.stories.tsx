import { createUseStyles } from 'react-jss'
import { Plausible } from '.'
import React from 'react'
import { type Meta, type StoryFn } from '@storybook/react'

export default {
	component: Plausible,
	title: 'Plausible'
} as Meta

const useStyles = createUseStyles({
	container: {
		height: '100vh'
	}
})

const DecoratedTemplate = () => {
	const decoratedStyles = useStyles()

	return (
		<div className={decoratedStyles.container}>
			<Plausible />
		</div>
	)
}

const Template: StoryFn = () => <DecoratedTemplate />

export const DisablePlausible = Template.bind({})
