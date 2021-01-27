import timezones from './timezones.js'

export const getTimezoneValue = (value = '') => {
	const guessedUserTz = guessUserTimezone()

	// if a value is provided and it exists, return the value
	if (value && isValidIanaName(value)) return value
	// otherwise check if the guessed tz exists, return the guessed value
	else if (isValidIanaName(guessedUserTz)) return guessedUserTz

	// otherwise the default value will be undefined and the user will have to select from the list
}

export const guessUserTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone

const isValidIanaName = (value: string) =>
	timezones.find(({ ianaName }) => ianaName === value)

export const mappedTimezoneOpts = () =>
	timezones.map(value => ({
		text: value.text,
		value: value.ianaName
	}))
