import { useCopy } from 'components/Copy'
import { faClipboardCheck, faCopy } from '@fortawesome/pro-light-svg-icons'
import { IconButton, IconButtonProps } from '../IconButton'
import React, { FC } from 'react'
import { Tooltip, TooltipProps } from '../Tooltip'

export interface CopyMethods {
	copy: () => void
}
interface CopyButtonProps {
	classes?: string[]
	tooltip?: boolean
	tooltipPlacement?: TooltipProps['placement']
	size?: IconButtonProps['size']
}

export const CopyButton: FC<CopyButtonProps> = ({
	classes = [],
	size,
	tooltip = true,
	tooltipPlacement = 'top'
}: CopyButtonProps) => {
	const { copy, isCopied } = useCopy()

	const renderButton = () => (
		<IconButton
			icon={isCopied ? faClipboardCheck : faCopy}
			onClick={copy}
			size={size}
		/>
	)

	return (
		<>
			{tooltip ? (
				<Tooltip
					placement={tooltipPlacement}
					title={isCopied ? 'Copied!' : 'Copy'}
					tooltipTriggerClasses={classes}
				>
					{renderButton()}
				</Tooltip>
			) : (
				renderButton()
			)}
		</>
	)
}
