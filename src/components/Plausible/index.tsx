import './plausible-exclusion.css'
import { Button } from 'components/Button'
import { createUseStyles } from 'react-jss'
import { styleguide } from 'components/assets/styles'
import React, { FC, useState } from 'react'

const {
	colors: { greens, reds },
	flexCenter,
	flexDown,
	font,
	fontWeight,
	spacing
} = styleguide

interface ReactJssProps {
	isExcluded: boolean
}

const useStyles = createUseStyles({
	container: {
		...flexCenter,
		...flexDown,
		height: '100%',
		textAlign: 'center'
	},
	desc: {
		padding: `${spacing.m}px 0`
	},
	exclude: {
		color: ({ isExcluded }: ReactJssProps) =>
			isExcluded ? greens.base : reds.base,
		fontWeight: 700,
		padding: `0 ${spacing.xs}px`
	},
	status: {
		paddingBottom: spacing.m
	},
	title: {
		...font.h1,
		fontWeight: fontWeight.bold
	}
})

export const Plausible: FC = () => {
	const [isExcluded, setIsExcluded] = useState(
		window.localStorage.plausible_ignore
	)
	const classes = useStyles({ isExcluded })

	const toggleExclusion = () => {
		const exclusionState = window.localStorage.plausible_ignore === 'true'

		if (exclusionState) {
			setIsExcluded(false)
			delete window.localStorage.plausible_ignore
		} else {
			setIsExcluded(true)
			window.localStorage.plausible_ignore = 'true'
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.title}>Plausible Exclude</div>
			<div className={classes.desc}>
				Click the button below to toggle your exclusion in analytics for
				this site
			</div>
			<div className={classes.status}>
				You currently
				<span className={classes.exclude}>
					{isExcluded ? 'are' : 'are not'}
				</span>
				excluding your visits.
			</div>
			<Button onClick={() => toggleExclusion()}>
				{isExcluded ? 'Stop excluding my visits' : 'Exclude my visits'}
			</Button>
		</div>
	)
}
