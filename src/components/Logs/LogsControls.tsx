import { createUseStyles } from 'react-jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { generateThemedControlsStyles } from '../Code/utils'
import { generateThemedMenuItemStyles } from './utils'
import { type LogsProps } from '.'
import noop from 'lodash/noop'
import { Popover } from '../Popover'
import React from 'react'
import { faCheck, faEllipsisV } from '@fortawesome/pro-regular-svg-icons'
import { IconButton, IconSizes } from '../IconButton'
import { styleguide, ThemeType } from '../assets/styles'

const { light, dark } = ThemeType
const { borderRadius, flexAlignCenter, spacing } = styleguide

export const useLogControlsStyles = createUseStyles({
	checkIcon: {
		left: 10.88,
		position: 'absolute'
	},
	container: {
		background: generateThemedControlsStyles(light).background,
		position: 'absolute',
		right: spacing['s+'],
		top: spacing['s+'],
		zIndex: 1
	},
	iconButton: {
		height: spacing.xl,
		width: spacing.xl,
		zIndex: 1
	},
	menu: {
		'& $menuItem': {
			'&:first-of-type': {
				borderTopLeftRadius: borderRadius,
				borderTopRightRadius: borderRadius
			},
			'&:last-of-type': {
				borderBottomLeftRadius: borderRadius,
				borderBottomRightRadius: borderRadius
			}
		},
		position: 'relative',
		width: 215
	},
	menuItem: {
		...flexAlignCenter,
		...generateThemedMenuItemStyles(light),
		cursor: 'pointer',
		padding: spacing.s,
		paddingLeft: spacing.xl
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $container': {
				background: generateThemedControlsStyles(dark).background
			},
			'& $menuItem': generateThemedMenuItemStyles(dark)
		}
	}
})

const CheckIcon = () => {
	const classes = useLogControlsStyles()

	return <FontAwesomeIcon className={classes.checkIcon} icon={faCheck} />
}

interface Props extends Pick<LogsProps, 'popupContainerSelector'> {
	copyToClipboard: () => void
	downloadLogs: () => void
	isCopied: boolean
	isDownloaded: boolean
	showTimestamp: boolean
	toggleShowTimestamp: () => void
}

const LogsControls: React.FC<Props> = ({
	copyToClipboard,
	downloadLogs,
	isCopied,
	isDownloaded,
	popupContainerSelector,
	showTimestamp,
	toggleShowTimestamp
}: Props) => {
	const compClasses = useLogControlsStyles()

	return (
		<div className={compClasses.container}>
			<Popover
				content={
					<div className={compClasses.menu}>
						<div
							className={compClasses.menuItem}
							onClick={toggleShowTimestamp}
						>
							{showTimestamp && <CheckIcon />}
							Show timestamps
						</div>
						<div
							className={compClasses.menuItem}
							onClick={copyToClipboard}
						>
							{isCopied && <CheckIcon />}
							{isCopied ? 'Copied!' : 'Copy logs to clipboard'}
						</div>
						<div
							className={compClasses.menuItem}
							onClick={downloadLogs}
						>
							{isDownloaded && <CheckIcon />}
							{isDownloaded ? 'Downloaded!' : 'Download logs'}
						</div>
					</div>
				}
				placement='bottomRight'
				popupContainerSelector={popupContainerSelector}
			>
				<IconButton
					classes={[compClasses.iconButton]}
					hasBorder
					icon={faEllipsisV}
					onClick={noop}
					size={IconSizes.sm}
				/>
			</Popover>
		</div>
	)
}

export default LogsControls
