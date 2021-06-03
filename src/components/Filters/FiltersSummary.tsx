import { createUseStyles } from 'react-jss'
import { filterSelectedFilters } from './utils'
import { FiltersList } from './types'
import { Icon } from '../Icon'
import startCase from 'lodash/startCase'
import { styleguide } from '../assets/styles'
import truncate from 'lodash/truncate'
import { useFiltersContext } from './FiltersContext'
import React, { FC, ReactNode } from 'react'

const { font, spacing } = styleguide

const truncateLength = 15

const useStyles = createUseStyles({
	bracket: { ...font.body, fontStyle: 'normal' },
	filterReadOnly: {
		'&:not(:last-of-type)::after': {
			content: "'+'", // eslint-disable-line quotes
			padding: {
				left: spacing.xs,
				right: spacing.xs
			}
		}
	},
	filterUnitReadOnly: {
		padding: {
			left: spacing.xs,
			right: spacing.xs
		}
	},
	operator: {
		padding: {
			left: spacing.xs,
			right: spacing.xs
		}
	},
	valuesReadOnly: {
		'&:not(:last-of-type)::after': {
			content: "','", // eslint-disable-line quotes
			paddingRight: spacing.xs
		}
	}
})

interface FiltersSummaryProps {
	filtersList: FiltersList
}

const FiltersSummary: FC<FiltersSummaryProps> = ({
	filtersList
}: FiltersSummaryProps) => {
	const { config } = useFiltersContext()

	const classes = useStyles()

	return (
		<>
			{filterSelectedFilters(filtersList).map(
				({
					selectedKey,
					selectedOperator = '=',
					selectedValues = []
				}) => {
					let values: string[] | ReactNode[]

					const iconConfig = config?.iconConfig

					// If config.iconConfig exists and the filterKey in that config
					// matches the current config, render icons.
					if (iconConfig && iconConfig.filterKey === selectedKey) {
						const iconMap = iconConfig.iconMap

						values = selectedValues.map(({ text, value }) =>
							// If value exists in the iconMap, render the icon.
							// Otherwise render correctly truncated text (to prevent "undefined" from being displayed).
							iconMap[value] ? (
								<Icon
									height={15}
									icon={iconMap[value]}
									key={value}
								/>
							) : (
								truncate(text, { length: truncateLength })
							)
						)
					} else {
						// For everything that is not an icon, render correctly truncated text.
						values = selectedValues.map(({ text }) =>
							truncate(text, { length: truncateLength })
						)
					}

					const keyStr = startCase(selectedKey)

					return (
						<span
							className={classes.filterReadOnly}
							key={selectedKey}
						>
							<span className={classes.bracket}>[</span>
							<span className={classes.filterUnitReadOnly}>
								{keyStr}
								<span className={classes.operator}>
									{selectedOperator}
								</span>
								{values.map(
									(
										val: string | ReactNode,
										valIndex: number
									) => (
										<span
											className={classes.valuesReadOnly}
											key={valIndex}
										>
											{val}
										</span>
									)
								)}
							</span>
							<span className={classes.bracket}>]</span>
						</span>
					)
				}
			)}
		</>
	)
}

export default FiltersSummary
