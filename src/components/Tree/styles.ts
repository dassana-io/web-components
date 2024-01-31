import { createUseStyles } from 'react-jss'
import {
	dropdownStyles,
	styleguide,
	themedStyles,
	ThemeType
} from 'components/assets/styles'

const { light, dark } = ThemeType

const { fontWeight } = styleguide

const generatedThemedTreeStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const {
		base: { background },
		hover,
		selected
	} = dropdownStyles[themeType]

	return {
		'& .ant-tree-list': {
			'& .ant-tree-node-content-wrapper:hover': {
				background: hover.background
			},
			'& .ant-tree-node-selected': {
				background: selected.background,
				color: selected.color,
				fontWeight: fontWeight.regular
			},
			'& .ant-tree-treenode': {
				color
			},
			background
		}
	}
}

export const useTreeStyles = createUseStyles({
	tree: generatedThemedTreeStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $tree': {
				...generatedThemedTreeStyles(dark)
			}
		}
	}
})
