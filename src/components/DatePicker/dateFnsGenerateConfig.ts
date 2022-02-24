import enUS from 'date-fns/locale/en-US'
import { GenerateConfig } from 'rc-picker/lib/generate'
import {
	addDays,
	addMonths,
	addYears,
	format as formatDate,
	getDate,
	getDay,
	getHours,
	getMinutes,
	getMonth,
	getSeconds,
	getWeek,
	getYear,
	isAfter,
	isValid,
	parse as parseDate,
	setDate,
	setHours,
	setMinutes,
	setMonth,
	setSeconds,
	setYear,
	startOfWeek
} from 'date-fns'

const localeParse = (format: string) => {
	return format
		.replace(/Y/g, 'y')
		.replace(/D/g, 'd')
		.replace(/gggg/, 'yyyy')
		.replace(/g/g, 'G')
		.replace(/([Ww])o/g, 'wo')
}

const generateConfig: Partial<GenerateConfig<Date>> = {
	// get
	getNow: () => new Date(),
	getWeekDay(date) {
		return getDay(date)
	},
	getYear(date) {
		return getYear(date)
	},
	getMonth(date) {
		return getMonth(date)
	},
	getDate(date) {
		return getDate(date)
	},
	getHour(date) {
		return getHours(date)
	},
	getMinute(date) {
		return getMinutes(date)
	},
	getSecond(date) {
		return getSeconds(date)
	},

	// set
	addYear(date, diff) {
		return addYears(date, diff)
	},
	addMonth(date, diff) {
		return addMonths(date, diff)
	},
	addDate(date, diff) {
		return addDays(date, diff)
	},
	setYear(date, year) {
		return setYear(date, year)
	},
	setMonth(date, month) {
		return setMonth(date, month)
	},
	setDate(date, num) {
		return setDate(date, num)
	},
	setHour(date, hour) {
		return setHours(date, hour)
	},
	setMinute(date, minute) {
		return setMinutes(date, minute)
	},
	setSecond(date, second) {
		return setSeconds(date, second)
	},

	// Compare
	isAfter(date1, date2) {
		return isAfter(date1, date2)
	},
	isValidate(date) {
		return isValid(date)
	},
	locale: {
		format: (_locale, date, format) => {
			if (!isValid(date)) {
				return ''
			}
			return formatDate(date, localeParse(format), {
				locale: enUS
			})
		},
		getWeek: (_locale, date) => {
			return getWeek(date, { locale: enUS })
		},
		getWeekFirstDate: (_locale, date) => {
			return startOfWeek(date, { locale: enUS })
		},
		getWeekFirstDay: () => {
			return enUS.options!.weekStartsOn!
		},
		parse: (_locale, text, formats) => {
			for (let i = 0; i < formats.length; i += 1) {
				const format = localeParse(formats[i])
				const formatText = text
				const date = parseDate(formatText, format, new Date(), {
					locale: enUS
				})

				if (isValid(date)) {
					return date
				}
			}

			return null
		}
	}
}

export default generateConfig
