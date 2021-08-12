import cn from 'classnames'
import isUndefined from 'lodash/isUndefined'
import { styleguide } from 'components/assets/styles'
import Icons, { IconName } from './IconsMap'
import React, { FC, SyntheticEvent } from 'react'

const {
	colors: { blacks }
} = styleguide

export interface SharedIconProps {
	/**
	 * Array of classes to pass to element
	 * @default []
	 */
	classes?: string[]
	/**
	 * The height of the icon, in pixels
	 */
	height?: number
	/**
	 * The width of the icon, in pixels
	 */
	width?: number
}

interface IconPath extends SharedIconProps {
	altText?: string
	/**
	 * The url of the icon if rendering a custom icon.
	 */
	icon: string
	/**
	 * The name of the icon if using icons provided by Dassana. **Note**: Either an `icon` or `iconKey` is required.
	 */
	iconKey?: never
}

interface IconKey extends SharedIconProps {
	color?: string
	iconKey: IconName
	icon?: never
}

export type IconProps = IconKey | IconPath

export const Icon: FC<IconProps> = ({ height, width, ...props }: IconProps) => {
	const { classes = [] } = props

	const areDimensionsUndefined = isUndefined(height) && isUndefined(width)

	const commonProps = {
		className: cn(classes),
		// if both width and height are undefined, default both to 32.
		// otherwise, let user control the dimensions with either just the height, width or both
		height: areDimensionsUndefined ? 32 : height,
		width: areDimensionsUndefined ? 32 : width
	}

	if (props.iconKey) {
		const { iconKey } = props

		const Svg = Icons[iconKey] ? Icons[iconKey] : Icons.dassana

		const { color = blacks['lighten-40'] } = props as IconKey

		return <Svg {...commonProps} fill={color} />
	}

	const { altText = '', icon } = props

	const useDefaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const span = document.createElement('span')
		span.innerText = altText
		e.currentTarget.replaceWith(span)
	}

	return (
		<img
			{...commonProps}
			alt={altText}
			onError={useDefaultSrc}
			src={icon}
		/>
	)
}

export type { IconName }
