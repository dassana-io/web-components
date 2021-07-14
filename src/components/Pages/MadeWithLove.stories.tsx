import { createUseStyles } from 'react-jss'
import React from 'react'
import {
	faAws,
	faGithub,
	faLinkedin,
	faSlack,
	faTwitterSquare
} from '@fortawesome/free-brands-svg-icons'
import { FooterLinksConfig, MadeWithLove } from './MadeWithLove'
import { Meta, Story } from '@storybook/react'

export default {
	component: MadeWithLove,
	title: 'Made With Love'
} as Meta

const useStyles = createUseStyles({
	container: {
		height: '100vh'
	}
})

const footerLinksConfig: FooterLinksConfig[] = [
	{
		href: 'http://www.twitter.com',
		icon: faTwitterSquare
	},
	{
		href: 'http://www.linkedin.com',
		icon: faLinkedin
	},
	{
		href: 'https://github.com/dassana-io/dassana',
		icon: faGithub
	},
	{
		href: 'https://www.slack.com',
		icon: faSlack
	},
	{
		href: 'https://github.com/dassana-io/dassana',
		icon: faAws
	}
]

const DecoratedTemplate = () => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<MadeWithLove footerLinksConfig={footerLinksConfig} />
		</div>
	)
}

const Template: Story = () => <DecoratedTemplate />

export const WithLove = Template.bind({})
