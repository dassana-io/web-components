import timezones from './timezones'

interface GetTimezoneValue {
	(value?: string): string | undefined
}

export const getTimezoneValue: GetTimezoneValue = (value = '') => {
	const guessedUserTz = guessUserTimezone()

	// if a value is provided and it exists, return the value
	if (value && isValidIanaName(value)) return value
	// otherwise check if the guessed tz exists, return the guessed value
	else if (isValidIanaName(guessedUserTz)) return guessedUserTz

	// otherwise the default value will be undefined and the user will have to select from the list
}

// -----------------------------------------------------

export const guessUserTimezone = (): string =>
	Intl.DateTimeFormat().resolvedOptions().timeZone

// -----------------------------------------------------

const isValidIanaName = (value: string): boolean =>
	!!timezones.find(({ ianaName }) => ianaName === value)

// -----------------------------------------------------

interface TimezoneOption {
	text: string
	value: string
}

interface MappedTimezoneOpts {
	(): TimezoneOption[]
}

export const mappedTimezoneOpts: MappedTimezoneOpts = () =>
	timezones.map(value => ({
		text: value.text,
		value: value.ianaName
	}))
