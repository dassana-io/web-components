import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import truncate from 'lodash/truncate'
import React, { FC, useMemo } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'
import { Tooltip, TooltipProps } from 'components'

const { font } = styleguide

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		...font.body,
		color: themes[light].text.primary
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': { color: themes[dark].text.primary }
		}
	}
})

export interface TruncatedTextProps {
	classes?: string[]
	maxChars?: number
	text: string
	tooltipPlacement?: TooltipProps['placement']
}

export const TruncatedText: FC<TruncatedTextProps> = ({
	classes = [],
	maxChars = 25,
	text,
	tooltipPlacement = 'bottom'
}: TruncatedTextProps) => {
	const componentClasses = useStyles()

	const truncatedStr = useMemo(
		() => truncate(text, { length: maxChars }),
		[maxChars, text]
	)

	const containerClasses = cn(
		{
			[componentClasses.container]: true
		},
		classes
	)

	const renderTextWithTooltip = () => (
		<Tooltip
			placement={tooltipPlacement}
			title={text}
			tooltipTriggerClasses={[containerClasses]}
		>
			{truncatedStr}
		</Tooltip>
	)

	const renderText = () => (
		<div className={containerClasses}>{truncatedStr}</div>
	)

	return text.length > maxChars ? renderTextWithTooltip() : renderText()
}
