import capitalize from 'lodash/capitalize'
import {
	type AbsoluteTimeRange,
	type RelativeTimeRange,
	type RelatveTimeConfig,
	type TimePrependLabels,
	type TimeRange,
	TimeTypes,
	TimeUnits
} from './types'
import {
	convertEpochToUserTimezone,
	parseParamsString
} from '@dassana-io/web-utils'

const ABSOLUTE_TIME_FORMAT = 'MM/dd/yy hh:mm a'

export const generateAbsoluteTimeRange = (
	startTime: number,
	endTime: number
): AbsoluteTimeRange => ({
	endTime,
	startTime,
	type: TimeTypes.absolute
})

export const generateRelativeTimeRange = (
	amount: number,
	unit: TimeUnits
): RelativeTimeRange => ({
	amount,
	type: TimeTypes.relative,
	unit
})

export const generateAbsoluteTimeLabel = (timeRange: AbsoluteTimeRange) => {
	const { endTime, startTime } = timeRange

	return `${convertEpochToUserTimezone(
		startTime,
		ABSOLUTE_TIME_FORMAT
	)} - ${convertEpochToUserTimezone(endTime, ABSOLUTE_TIME_FORMAT)}`
}

export const generateRelativeTimeLabel = (
	timeRange: RelativeTimeRange,
	prepend?: TimePrependLabels
) => {
	const { amount, unit } = timeRange

	const singular = amount === 1

	const prependStr = prepend ? `${capitalize(prepend)} ` : ''
	const unitStr = singular ? `${unit.slice(0, -1)}` : unit

	const label = singular
		? `${prependStr} ${unitStr}`
		: `${prependStr} ${amount} ${unitStr}`

	return label
}

export const generateTimeLabel = (
	timeRange: TimeRange,
	prepend?: TimePrependLabels
): string => {
	switch (timeRange.type) {
		case TimeTypes.absolute:
			return generateAbsoluteTimeLabel(timeRange as AbsoluteTimeRange)
		case TimeTypes.all:
			return 'All Time'
		default:
			return generateRelativeTimeLabel(
				timeRange as RelativeTimeRange,
				prepend
			)
	}
}

const { day, hour, week, month } = TimeUnits

const relativeTimeConfig: RelatveTimeConfig[] = [
	{
		amounts: [1],
		unit: hour
	},
	{
		amounts: [1],
		unit: day
	},
	{
		amounts: [1],
		unit: week
	},
	{
		amounts: [1, 3, 12],
		unit: month
	}
]

export const generateRelativeTimeMap = (): RelativeTimeRange[] => {
	const timeMap: RelativeTimeRange[] = []

	relativeTimeConfig.forEach(({ amounts, unit }) =>
		amounts.forEach(amt =>
			timeMap.push(generateRelativeTimeRange(amt, unit))
		)
	)

	return timeMap
}

const convertStrToInt = (stringifiedNum: unknown): number | undefined => {
	if (typeof stringifiedNum === 'string') {
		const parsedNum = parseInt(stringifiedNum)

		if (Number.isInteger(parsedNum)) return parsedNum
	}
}

export type ValidTimeRange = AbsoluteTimeRange | RelativeTimeRange | TimeRange

export const extractTimeRangeFromParams = (): ValidTimeRange | undefined => {
	const { search } = window.location

	const params = parseParamsString(search)
	const { timeType } = params

	let timeRange: ValidTimeRange | undefined

	switch (timeType) {
		case TimeTypes.absolute: {
			const { startTime, endTime } = params

			const [parsedEndTime, parsedStartTime] = [
				convertStrToInt(endTime),
				convertStrToInt(startTime)
			]

			if (parsedEndTime && parsedStartTime) {
				timeRange = {
					endTime: parsedEndTime,
					startTime: parsedStartTime,
					type: TimeTypes.absolute
				}
			}

			break
		}

		case TimeTypes.all: {
			timeRange = { type: TimeTypes.all }
			break
		}

		case TimeTypes.relative: {
			const { amount, unit } = params

			if (typeof unit === 'string') {
				if (Object.values(TimeUnits).includes(unit as TimeUnits)) {
					const parsedAmount = convertStrToInt(amount)

					if (parsedAmount) {
						timeRange = {
							amount: parsedAmount,
							type: TimeTypes.relative,
							unit: unit as TimeUnits
						}
					}
				}
			}

			break
		}
	}

	return timeRange
}
