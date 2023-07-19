import { createUseStyles } from 'react-jss'
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { type FC } from 'react'
import { themes, ThemeType } from '../assets/styles'
import { Tooltip, type TooltipProps } from 'components/Tooltip'

const { dark, light } = ThemeType

const useStyles = createUseStyles({
	infoIcon: {
		color: themes[light].text.primary
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $infoIcon': { color: themes[dark].text.primary }
		}
	}
})

export interface InfoTipProps {
	classes?: TooltipProps['classes']
	content: TooltipProps['title']
	infoTipTriggerClasses?: TooltipProps['tooltipTriggerClasses']
	placement?: TooltipProps['placement']
	popupContainerSelector?: TooltipProps['popupContainerSelector']
}

export const InfoTip: FC<InfoTipProps> = ({
	classes = [],
	infoTipTriggerClasses = [],
	content,
	placement = 'top',
	popupContainerSelector
}: InfoTipProps) => {
	const componentClasses = useStyles()

	return (
		<Tooltip
			classes={classes}
			placement={placement}
			popupContainerSelector={popupContainerSelector}
			title={content}
			tooltipTriggerClasses={infoTipTriggerClasses}
		>
			<FontAwesomeIcon
				className={componentClasses.infoIcon}
				icon={faInfoCircle}
			/>
		</Tooltip>
	)
}
