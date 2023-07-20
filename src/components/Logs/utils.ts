import { convertEpochToUserTimezone } from '@dassana-io/web-utils'
import { type LogsType } from '.'
import { styleguide, ThemeType } from '../assets/styles'

type DownloadBlob = (blob: Blob, filename: string, callback?: () => void) => void
export const downloadBlob: DownloadBlob = (blob, filename, callback) => {
	const element = document.createElement('a')

	element.href = URL.createObjectURL(blob)
	element.download = filename

	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)

	if (callback) callback()
}

// --------------------------------------------------

export const formatLogs = (logs: LogsType): string => {
	let formattedLogs = ''

	for (const log of logs) {
		formattedLogs += `${convertEpochToUserTimezone(log.ts)} ${
			log.message
		}\n`
	}

	return formattedLogs
}

/* -------------- Styles Related -------------- */

const { light, dark } = ThemeType
const {
	colors: { blacks, grays }
} = styleguide

const timestampPalette = {
	[dark]: {
		color: blacks['lighten-30']
	},
	[light]: {
		color: blacks['lighten-50']
	}
}

export const generateThemedMenuItemStyles = (themeType: ThemeType) => ({
	'&:first-of-type': {
		borderBottom: `1px solid ${
			themeType === light ? blacks['lighten-70'] : blacks.base
		}`
	},
	'&:hover': {
		backgroundColor:
			themeType === light ? grays['lighten-40'] : blacks['lighten-20']
	}
})

export const generateThemedTimestampStyles = (themeType: ThemeType) => ({
	color: timestampPalette[themeType].color
})
