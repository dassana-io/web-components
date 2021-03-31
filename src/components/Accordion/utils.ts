import { Key } from 'react'
import { themedStyles, ThemeType } from '../assets/styles'

export const generateAccordionPanelStyles = (themeType: ThemeType) => {
	const { base } = themedStyles[themeType]

	const borderStyles = `1px solid ${base.borderColor}`

	return {
		'&:first-of-type': {
			borderTop: borderStyles
		},
		borderBottom: borderStyles,
		color: base.color
	}
}

export const getInitialExpandedKeys = <T extends { key: Key }>(
	items: T[],
	defaultExpandedKeys: Key[],
	expandAllOnMount?: boolean
): Key[] => {
	if (expandAllOnMount) return items.map(({ key }) => key)
	else return defaultExpandedKeys
}

export const getUpdatedExpandedKeys = (
	itemKey: Key,
	expandedKeys: Key[],
	expandMultiple: boolean
): Key[] => {
	let newExpandedKeys = [...expandedKeys, itemKey]

	// Close panel if it is open
	if (expandedKeys.includes(itemKey))
		newExpandedKeys = expandedKeys.filter(key => itemKey !== key)
	// If expandMultiple is false, only one panel can be open at a time
	else if (!expandMultiple) newExpandedKeys = [itemKey]

	return newExpandedKeys
}
