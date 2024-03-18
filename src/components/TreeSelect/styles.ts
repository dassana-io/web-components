import { createUseStyles } from 'react-jss'
import { generateThemedDropdownStyles } from 'components/Select/utils'
import {
	dropdownStyles,
	inputPalette,
	styleguide,
	themedStyles,
	ThemeType
} from 'components/assets/styles'

const { light, dark } = ThemeType

const { fontWeight } = styleguide

const generatedThemedTreeDropdownStyles = (themeType: ThemeType) => {
	const {
		base: { color }
	} = themedStyles[themeType]

	const {
		base: { background },
		hover,
		selected
	} = dropdownStyles[themeType]

	const {
		disabled: { color: disabledColor }
	} = inputPalette[themeType]

	return {
		...generateThemedDropdownStyles(themeType),
		'& .ant-select-tree': {
			'& .ant-select-tree-node-content-wrapper:hover': {
				background: hover.background
			},
			'& .ant-select-tree-node-selected': {
				background: selected.background,
				color: selected.color,
				fontWeight: fontWeight.regular
			},
			'& .ant-select-tree-treenode': {
				color
			},
			'& .ant-select-tree-treenode.ant-select-tree-treenode-disabled': {
				'& .ant-select-tree-node-content-wrapper': {
					'&:hover': {
						background: 'unset'
					},
					color: disabledColor
				}
			},
			background
		}
	}
}

export const useTreeDropdownStyles = createUseStyles({
	dropdown: generatedThemedTreeDropdownStyles(light),
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $dropdown': {
				...generatedThemedTreeDropdownStyles(dark)
			}
		}
	}
})
