import Color from 'color'
import { TooltipPlacement } from 'antd/es/tooltip'

export const TAG = 'data-test'

export const getDataTestAttributeProp = (
	cmpName: string,
	dataTag?: string
): { [TAG]: string } => ({
	[TAG]: dataTag ? `${cmpName}-${dataTag}` : cmpName
})

export const placementOptions: TooltipPlacement[] = [
	'bottom',
	'bottomLeft',
	'bottomRight',
	'left',
	'leftBottom',
	'leftTop',
	'right',
	'rightBottom',
	'rightTop',
	'top',
	'topLeft',
	'topRight'
]

const getRgba = (color: string, a: number) => {
	const [r, g, b] = Color(color).rgb().array()

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

enum LigtenOrDarkenType {
	light,
	dark
}

export const lightenOrDarkenColor = (
	color: string,
	percent: number,
	colorChangeType?: keyof typeof LigtenOrDarkenType
) => {
	if (percent < 0 || percent > 100)
		throw new Error('please provide a valid percentage')

	const clr = Color(color)

	const changedClr =
		colorChangeType === 'dark'
			? clr.darken(percent / 100)
			: clr.lighten(percent / 100)

	return changedClr.hex()
}

export const fadeColor = (color: string, fadePercent: number) => {
	if (fadePercent < 0 || fadePercent > 100)
		throw new Error('please provide a valid percentage')

	const fadedColor = Color(color).fade(fadePercent / 100)

	return getRgba(fadedColor.hex(), fadedColor.alpha())
}
