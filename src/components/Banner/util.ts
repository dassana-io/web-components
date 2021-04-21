import isUndefined from 'lodash/isUndefined'
import { themedStyles, ThemeType } from 'components/assets/styles'

export const generateThemedBannerStyles = (themeType: ThemeType) => {
	const {
		base: { backgroundColor, color }
	} = themedStyles[themeType]

	return {
		backgroundColor: backgroundColor,
		color
	}
}

const BANNER_PREFERENCE = 'bannerPref'

export interface Banners {
	[key: string]: boolean
}

export const getBannerPreferences = (): Banners => {
	const bannerPref = localStorage.getItem(BANNER_PREFERENCE)
	return bannerPref ? JSON.parse(bannerPref) : {}
}

export const isNewBanner = (banners: Banners, id: string): boolean =>
	isUndefined(banners[id])

export const updateBannerPreferences = (
	currentBanners: Banners,
	id: string,
	visible: boolean
) =>
	localStorage.setItem(
		BANNER_PREFERENCE,
		JSON.stringify({ ...currentBanners, [id]: visible })
	)
