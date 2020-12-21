import { MultiSelectOption } from '.'
import React from 'react'
import { Tag } from 'components'

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

// ---------------------------

interface GetTagRender {
	maxTagTextLength: number
	mappedOptions: MappedOptions
	tagClasses?: string[]
}

export const getTagRender = ({
	maxTagTextLength,
	mappedOptions,
	tagClasses = []
}: GetTagRender) => (props: Record<string, any>) => {
	const { label, onClose, value } = props

	const maxTagPlaceholder = mappedOptions[value]

	return (
		<Tag
			classes={tagClasses}
			closable={!!maxTagPlaceholder}
			onClose={onClose}
		>
			{maxTagPlaceholder
				? truncateText(maxTagPlaceholder.text, maxTagTextLength)
				: label}
		</Tag>
	)
}

// ---------------------------

const truncateText = (text: string, maxLength: number) =>
	text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
