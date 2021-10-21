import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { ColoredDot } from 'components/ColoredDot'
import { createUseStyles } from 'react-jss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash/isEmpty'
import React, { FC, ReactNode, useMemo } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const {
	colors: { blues, oranges, reds, yellows },
	flexAlignCenter,
	font,
	fontWeight,
	spacing
} = styleguide

const useStyles = createUseStyles({
	container: {
		...flexAlignCenter,
		...font.label,
		color: themes[light].text.primary,
		fontWeight: fontWeight.light
	},
	indicator: {
		display: 'flex',
		margin: {
			left: spacing.s,
			right: spacing.s
		}
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': { color: themes[dark].text.primary }
		}
	}
})

export type RiskRank = 'critical' | 'high' | 'medium' | 'low' | 'accepted'

/* eslint-disable sort-keys */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RiskRank = {
	Critical: 'critical' as RiskRank,
	High: 'high' as RiskRank,
	Medium: 'medium' as RiskRank,
	Low: 'low' as RiskRank,
	Accepted: 'accepted' as RiskRank
}
/* eslint-enable sort-keys */

const { Critical, High, Low, Medium, Accepted } = RiskRank

const riskRankColorMap = {
	[Critical]: reds['darken-20'],
	[High]: reds.base,
	[Medium]: oranges.base,
	// eslint-disable-next-line sort-keys
	[Low]: yellows.base
}

interface RiskProperties {
	indicator: ReactNode | string
	text: string
}

const getRiskProperties = (risk?: RiskRank): RiskProperties => {
	if (isEmpty(risk)) risk = undefined

	switch (risk) {
		case Accepted:
			return {
				indicator: (
					<FontAwesomeIcon
						color={blues.base}
						fontSize={font.bodyLarge.fontSize}
						icon={faCheckCircle}
					/>
				),
				text: capitalize(risk)
			}
		case undefined:
			return {
				indicator: '🤷🏻‍♀️',
				text: 'Not defined'
			}
		default:
			return {
				indicator: <ColoredDot color={riskRankColorMap[risk]} />,
				text: capitalize(risk)
			}
	}
}

export interface RiskIndicatorProps {
	classes?: string[]
	risk?: RiskRank
}

export const RiskIndicator: FC<RiskIndicatorProps> = ({
	classes = [],
	risk
}: RiskIndicatorProps) => {
	const { indicator, text } = useMemo(() => getRiskProperties(risk), [risk])
	const componentClasses = useStyles()

	return (
		<div className={cn({ [componentClasses.container]: true }, classes)}>
			<span className={componentClasses.indicator}>{indicator}</span>
			<span>{text}</span>
		</div>
	)
}
