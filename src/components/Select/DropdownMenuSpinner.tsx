import { createUseStyles } from 'react-jss'
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateThemedDropdownMenuSpinnerStyles } from './styles'
import React from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { dark, light } = ThemeType
const { spacing } = styleguide

const useStyles = createUseStyles({
	spinner: {
		...generateThemedDropdownMenuSpinnerStyles(light),
		marginBottom: spacing.s,
		marginLeft: spacing.m
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $spinner': generateThemedDropdownMenuSpinnerStyles(dark)
		}
	}
})

export const DropdownMenuSpinner = () => {
	const classes = useStyles()

	return (
		<FontAwesomeIcon
			className={classes.spinner}
			icon={faCircleNotch}
			spin
		/>
	)
}
