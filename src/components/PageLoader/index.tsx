import { createUseStyles } from 'react-jss'
import { ReactComponent as LoadingLightbulb } from '../assets/images/loading_lightbulb.svg'
import React from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const {
	colors: { blacks },
	flexCenter
} = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		'& svg': {
			'& path': {
				'&.lightbulb': {
					animation: 'scale 5s infinite ease-out',
					fill: blacks['lighten-10']
				},
				animation: 'scaleAccents 5s infinite ease-out',
				fill: blacks['lighten-50'],
				'transform-origin': 'center'
			},
			display: 'block',
			height: '258px',
			width: '258px'
		},
		...flexCenter,
		background: themes[light].background.primary,
		width: 'inherit'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		'@keyframes scale': {
			'0%, 100%': {
				transform: 'scale(0.0)'
			},
			'50%': {
				transform: 'scale(1)'
			},
			'7%, 90%': {
				transform: 'scale(0.4)'
			}
		},
		'@keyframes scaleAccents': {
			'0%, 100%': {
				opacity: 0,
				transform: 'scale(0.0)'
			},
			'50%': {
				opacity: 1,
				transform: 'scale(1)'
			},
			'7%, 90%': {
				opacity: 0.5,
				transform: 'scale(0.4)'
			}
		},
		[`.${dark}`]: {
			'& $container': {
				background: themes[dark].background.primary
			}
		}
	}
})

export const PageLoader: React.FC = () => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<LoadingLightbulb />
		</div>
	)
}
