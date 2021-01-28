import { TimeFormat } from './index'
import moment, { MomentInputObject } from 'moment'

const hourIntegerFormat = 'HH'

export const formatTime = (format: TimeFormat, value?: number) => {
	if (!value && typeof value !== 'number') return value

	if (format === 'unix') {
		return moment.unix(value)
	}

	return moment(value, hourIntegerFormat)
}

export const parseTime = (momentObj: MomentInputObject, format: TimeFormat) => {
	return format === 'unix'
		? moment(momentObj).unix()
		: parseInt(moment(momentObj).format(hourIntegerFormat))
}
