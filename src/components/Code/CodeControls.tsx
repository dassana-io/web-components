import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { faCopy } from '@fortawesome/pro-regular-svg-icons'
import { generateThemedControlsStyles } from './utils'
import { generateThemedIconBtnStyles } from 'components/IconButton/utils'
import { IconButton } from 'components/IconButton'
import noop from 'lodash/noop'
import { Tooltip } from 'components/Tooltip'
import { ReactComponent as WrapIcon } from './wrap_icon.svg'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { styleguide, ThemeType } from 'components/assets/styles'

const { borderRadius, flexCenter, spacing } = styleguide

const { light, dark } = ThemeType

const useStyles = createUseStyles({
	codeControls: {
		...flexCenter,
		...generateThemedControlsStyles(light),
		borderRadius,
		padding: `${spacing.xs}px ${spacing.s}px`,
		position: 'absolute',
		right: spacing.s,
		top: spacing.s,
		zIndex: 1
	},
	wrapIcon: {
		...generateThemedIconBtnStyles(light),
		cursor: 'pointer',
		margin: { left: spacing.s },
		paddingTop: 2
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $codeControls': generateThemedControlsStyles(dark),
			'& $wrapIcon': generateThemedIconBtnStyles(dark)
		}
	}
})

// This is left as an object so more controls (e.g. download) can be added later
export interface DisplayCodeControls {
	copy?: boolean
	wrap?: boolean
}

interface Props {
	classes?: string[]
	displayControls?: DisplayCodeControls
	onClickCopyCode: (onCopySuccess: () => void) => void
	onClickWrapCode?: () => void
}

export const CodeControls: FC<Props> = ({
	classes = [],
	displayControls = {},
	onClickCopyCode,
	onClickWrapCode = noop
}: Props) => {
	const [isCopied, setIsCopied] = useState(false)
	const compClasses = useStyles()

	const { copy = true, wrap = true } = displayControls

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
					<IconButton icon={faCopy} onClick={onCopyClick} size={14} />
				</Tooltip>
			)}
			{wrap && (
				<Tooltip placement='top' renderWithoutDataTag title='Wrap'>
					<WrapIcon
						className={compClasses.wrapIcon}
						height={16}
						onClick={onClickWrapCode}
					/>
				</Tooltip>
			)}
		</div>
	)
}
