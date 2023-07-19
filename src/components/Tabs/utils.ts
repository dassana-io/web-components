import findIndex from 'lodash/findIndex'
import { type TabConfig } from './index'
import { themedStyles, themes, type ThemeType } from 'components/assets/styles'

export const generateThemedTabsListStyles = (themeType: ThemeType) => {
	const {
		base: { borderColor, color }
	} = themedStyles[themeType]

	return {
		borderBottomColor: borderColor,
		color
	}
}

export const generateThemedActiveTabStyles = (themeType: ThemeType) => {
	const { active } = themes[themeType].state

	return {
		borderBottomColor: active,
		color: active
	}
}

export enum TabParams {
	page = 'page'
}

export const findDefaultActiveIndex = (
	key: TabParams,
	params: Record<string, string[]>,
	tabConfig: TabConfig[],
	defaultIndex = 0
): number => {
	let index = defaultIndex

	if (params[key]) {
		index = findIndex(tabConfig, { key: params[key][0] })
	}

	return index
}
