import cn from 'classnames'
import { CodeProps } from '../Code'
import { convertEpochToUserTimezone } from '@dassana-io/web-utils'
import { createUseStyles } from 'react-jss'
import { Input } from '../Input'
import LogsControls from './LogsControls'
import Mark from 'mark.js'
import { commonCodeStyles, copyToClipboard } from 'components/Code/utils'
import {
	downloadBlob,
	formatLogs,
	generateThemedTimestampStyles
} from './utils'
import {
	generateThemedCodeStyles,
	generateThemedLineNumStyles
} from '../Code/utils'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { light, dark } = ThemeType
const { flexDown, spacing } = styleguide

const commonLogSpanStyles = {
	display: 'inline-block',
	padding: { right: spacing.m }
}

export const useStyles = createUseStyles({
	container: {
		...commonCodeStyles,
		...flexDown,
		height: '100%',
		width: '100%'
	},
	lineNumber: {
		borderRight: generateThemedLineNumStyles(light).borderRight,
		display: commonLogSpanStyles.display,
		margin: { right: spacing['s+'] },
		padding: { right: spacing.s },
		textAlign: 'end',
		userSelect: 'none',
		width: spacing['l+']
	},
	logsWrapper: {
		overflow: 'auto',
		padding: `${spacing.m}px ${spacing.s}px`,
		whiteSpace: 'nowrap'
	},
	message: commonLogSpanStyles,
	search: {
		margin: { bottom: spacing.m }
	},
	timestamp: {
		...commonLogSpanStyles,
		...generateThemedTimestampStyles(light)
	},
	wrapper: {
		...generateThemedCodeStyles(light),
		height: '100%',
		position: 'relative',
		width: '100%'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $lineNumber': {
				borderRight: generateThemedLineNumStyles(dark).borderRight
			},
			'& $timestamp': generateThemedTimestampStyles(dark),
			'& $wrapper': generateThemedCodeStyles(dark)
		}
	}
})

export interface Log {
	ts?: number
	message: string
}

export type LogsType = Log[]

export interface LogsProps extends Pick<CodeProps, 'search'> {
	classes?: string[]
	displayControls?: boolean
	popupContainerSelector?: string
	filename: string
	logs: LogsType
}

const downloadMsgDelay = 800
const msgDuration = 1250

export const Logs: FC<LogsProps> = ({
	classes = [],
	displayControls = true,
	filename,
	logs,
	popupContainerSelector,
	search = true
}: LogsProps) => {
	const compClasses = useStyles()

	const logsRef = useRef<HTMLDivElement>(null)

	const [isCopied, setIsCopied] = useState(false)
	const [isDownloaded, setIsDownloaded] = useState(false)
	const [showTimestamp, setShowTimestamp] = useState(false)

	const downloadLogs = () => {
		const blob = new Blob([formatLogs(logs)])

		const callback = () =>
			setTimeout(() => setIsDownloaded(!isDownloaded), downloadMsgDelay)

		downloadBlob(blob, filename, callback)
	}

	const toggleShowTimestamp = () => setShowTimestamp(!showTimestamp)

	useEffect(() => {
		if (isCopied) setTimeout(() => setIsCopied(false), msgDuration)
	}, [isCopied])

	useEffect(() => {
		if (isDownloaded)
			setTimeout(
				() => setIsDownloaded(false),
				msgDuration + downloadMsgDelay
			)
	}, [isDownloaded])

	const copyLogsToClipboard = () =>
		copyToClipboard(formatLogs(logs), () => setIsCopied(!isCopied))

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const markInstance = new Mark(logsRef.current as HTMLElement)

		/**
		 * Remove previous marked elements and mark the new keyword inside the context
		 */
		markInstance.unmark({
			done: () => markInstance.mark(e.target.value)
		})
	}

	let searchProps = {}

	if (search) {
		const { classes = [], fullWidth = true, placeholder = '' } =
			typeof search === 'object'
				? search
				: { classes: [], fullWidth: true, placeholder: '' }

		searchProps = {
			classes: [compClasses.search, ...classes],
			fullWidth,
			placeholder
		}
	}

	return (
		<div className={cn(compClasses.container, classes)} ref={logsRef}>
			{search && <Input {...searchProps} onChange={onSearch} />}
			<div className={compClasses.wrapper}>
				{displayControls && (
					<LogsControls
						copyToClipboard={copyLogsToClipboard}
						downloadLogs={downloadLogs}
						isCopied={isCopied}
						isDownloaded={isDownloaded}
						popupContainerSelector={popupContainerSelector}
						showTimestamp={showTimestamp}
						toggleShowTimestamp={toggleShowTimestamp}
					/>
				)}
				<div className={compClasses.logsWrapper}>
					{logs.map((log, i) => (
						<div key={i}>
							<span className={compClasses.lineNumber}>
								{i + 1}
							</span>
							{showTimestamp && (
								<span className={compClasses.timestamp}>
									{convertEpochToUserTimezone(log.ts)}
								</span>
							)}
							<span className={compClasses.message}>
								{log.message}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
