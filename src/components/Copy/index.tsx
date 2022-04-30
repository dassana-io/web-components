import { CopyButton } from './CopyButton'
import { createUseStyles } from 'react-jss'
import { copyToClipboard, createCtx } from '@dassana-io/web-utils'
import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { Tooltip, TooltipProps } from '../Tooltip'

const useStyles = createUseStyles({
	copyContainer: {
		width: '100%'
	}
})

export interface CopyContextProps {
	copy: () => void
	isCopied: boolean
}

export const [useCopy, CopyContextProvider] = createCtx<CopyContextProps>()

interface CopyProps {
	children: ReactNode
	copyStr: string
	tooltip?: boolean
	tooltipPlacement?: TooltipProps['placement']
}

export const CopyProvider: FC<CopyProps> = ({
	children,
	copyStr,
	tooltip = true,
	tooltipPlacement = 'top'
}: CopyProps) => {
	const [isCopied, setIsCopied] = useState(false)

	const classes = useStyles()

	const onCopy = useCallback(() => {
		copyToClipboard(copyStr)
		setIsCopied(true)
	}, [copyStr])

	useEffect(() => {
		if (isCopied) setTimeout(() => setIsCopied(false), 1250)
	}, [isCopied])

	return (
		<CopyContextProvider
			value={{
				copy: onCopy,
				isCopied
			}}
		>
			<div className={classes.copyContainer} onClick={onCopy}>
				{tooltip ? (
					<Tooltip
						placement={tooltipPlacement}
						title={isCopied ? 'Copied!' : 'Copy'}
					>
						{children}
					</Tooltip>
				) : (
					children
				)}
			</div>
		</CopyContextProvider>
	)
}

export { CopyButton }
