import { MultiSelectOption } from '.'

interface MappedOptions {
	[value: string]: MultiSelectOption
}

export const mapOptions = (options: MultiSelectOption[]) => {
	const mappedOpts: MappedOptions = {}

	for (const option of options) {
		mappedOpts[option.value] = option
	}

	return mappedOpts
}
