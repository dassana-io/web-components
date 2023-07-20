import { createUseStyles } from 'react-jss'
import { MadeWithLove } from './MadeWithLove'
import React from 'react'
import { type Meta, type Story } from '@storybook/react'

export default {
	component: MadeWithLove,
	title: 'Made With Love'
} as Meta

const useStyles = createUseStyles({
	container: {
		height: '100vh'
	}
})

const DecoratedTemplate = () => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<MadeWithLove />
		</div>
	)
}

const Template: Story = () => <DecoratedTemplate />

export const WithLove = Template.bind({})
