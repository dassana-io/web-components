import { Button } from 'components/Button'
import { createUseStyles } from 'react-jss'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Error1 from '../assets/images/404_error_1.svg'
import Error2 from '../assets/images/404_error_2.svg'
import random from 'lodash/random'
import { styleguide } from 'components/assets/styles'
import { useHistory } from 'react-router'
import React, { FC } from 'react'

const {
	colors: { blacks, blues },
	flexCenter,
	flexDown,
	flexJustifyCenter,
	font,
	fontWeight: { light, regular },
	spacing
} = styleguide

const useStyles = createUseStyles({
	bgImg: {
		width: '100%'
	},
	btn: {
		...font.body,
		backgroundColor: `${blues.base} !important`,
		color: `${blacks['lighten-80']} !important`,
		fontWeight: light,
		height: 40
	},
	btnIcon: {
		marginLeft: spacing.s
	},
	container: {
		...flexDown,
		...flexJustifyCenter,
		color: blacks['lighten-50'],
		height: '100%'
	},
	details: {
		...flexCenter,
		...flexDown,
		flexGrow: 2
	},
	msg: {
		...font.h3,
		fontWeight: regular,
		paddingBottom: spacing.xl
	},
	title: {
		color: blacks.base,
		fontSize: 64,
		fontWeight: 700
	}
})

const error404Config = [
	{
		bg: Error1,
		// eslint-disable-next-line quotes
		msg: "it's our cute and naughty friend Milo",
		renderButton: () => <>Get help!</>,
		title: 'Oh Poop!'
	},
	{
		bg: Error2,
		msg: 'Guess thats the wrong door',
		renderButton: (iconClass: string) => (
			<>
				Go home
				<FontAwesomeIcon className={iconClass} icon={faHome} />
			</>
		),
		title: 'Oops!'
	}
]

const Error404: FC = () => {
	const classes = useStyles()
	const history = useHistory()

	const errorConfigIndex = random(error404Config.length - 1)
	const { title, msg, bg, renderButton } = error404Config[errorConfigIndex]

	return (
		<div className={classes.container}>
			<div className={classes.details}>
				<div className={classes.title}>{title}</div>
				<div className={classes.msg}>{msg}</div>
				<Button
					classes={[classes.btn]}
					onClick={() => history.push('/')}
				>
					{renderButton(classes.btnIcon)}
				</Button>
			</div>
			<img alt='404' className={classes.bgImg} src={bg} />
		</div>
	)
}

export default Error404
