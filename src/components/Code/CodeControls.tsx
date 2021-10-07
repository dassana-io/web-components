import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faCopy } from '@fortawesome/pro-regular-svg-icons'
import { generateThemedControlsStyles } from './utils'
import { IconButton } from 'components/IconButton'
import { Tooltip } from 'components/Tooltip'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { borderRadius, spacing } = styleguide

const { light, dark } = ThemeType

const useStyles = createUseStyles({
	codeControls: {
		...generateThemedControlsStyles(light),
		borderRadius,
		padding: `${spacing.xs}px ${spacing.s}px`,
		position: 'absolute',
		right: spacing['s+'],
		top: spacing['s+'],
		zIndex: 1
	},
	iconButton: {
		padding: {
			left: spacing.s,
			right: spacing.s
		}
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $codeControls': generateThemedControlsStyles(dark)
		}
	}
})

// This is left as an object so more controls (e.g. download) can be added later
export interface DisplayCodeControls {
	copy?: boolean
}

interface Props {
	classes?: string[]
	displayControls?: DisplayCodeControls
	onClickCopyCode: (onCopySuccess: () => void) => void
}

export const CodeControls: FC<Props> = ({
	classes = [],
	displayControls = {},
	onClickCopyCode
}: Props) => {
	const [isCopied, setIsCopied] = useState(false)
	const compClasses = useStyles()

	const { copy = true } = displayControls

	const onCopyClick = useCallback(() => {
		onClickCopyCode(() => setIsCopied(true))
	}, [onClickCopyCode])

	useEffect(() => {
		if (isCopied) setTimeout(() => setIsCopied(false), 1250)
	}, [isCopied])

	return (
		<div className={cn(compClasses.codeControls, classes)}>
			{copy && (
				<Tooltip placement='top' title={isCopied ? 'Copied!' : 'Copy'}>
					<IconButton
						classes={[compClasses.iconButton]}
						icon={faCopy}
						onClick={onCopyClick}
						size={14}
					/>
				</Tooltip>
			)}
		</div>
	)
}
