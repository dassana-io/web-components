import { createUseStyles } from 'react-jss'
import { filterSelectedFilters } from './utils'
import { FiltersList } from './types'
import { IconCell } from 'components/Table/IconCell'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'
import { styleguide } from '../assets/styles'
import truncate from 'lodash/truncate'
import { useFiltersContext } from './FiltersContext'
import { useWindowSize } from '@dassana-io/web-utils'
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
	iconWrapper: {
		display: 'inline'
	},
	label: {
		marginLeft: spacing.xs
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
			paddingRight: spacing.s
		}
	}
})

interface FiltersSummaryProps {
	filtersList: FiltersList
}

const FiltersSummary: FC<FiltersSummaryProps> = ({
	filtersList
}: FiltersSummaryProps) => {
	const { isMobile } = useWindowSize()

	const { allFilters, config = {} } = useFiltersContext()

	const classes = useStyles()

	const renderMobileSummary = () => {
		const selectedFiltersCount = filtersList.filter(
			filtersListItem => !!filtersListItem.selectedValues
		).length

		return selectedFiltersCount ? (
			<span className={classes.filterReadOnly}>
				{selectedFiltersCount} filters
			</span>
		) : (
			<></>
		)
	}

	return isMobile || isEmpty(allFilters) ? (
		renderMobileSummary()
	) : (
		<>
			{filterSelectedFilters(filtersList).map(
				({
					selectedKey,
					selectedOperator = '=',
					selectedValues = []
				}) => {
					let values: string[] | ReactNode[]

					// If selectedKey and config[selectedKey].iconMap exists, render icons
					if (config[selectedKey] && config[selectedKey].iconMap) {
						const iconMap = config[selectedKey].iconMap || {}

						values = selectedValues.map(({ text, value }) =>
							// If value exists in the iconMap, render the icon.
							// Otherwise render correctly truncated text (to prevent "undefined" from being displayed).
							iconMap[value] ? (
								<IconCell
									iconProps={{
										height: 15,
										icon: iconMap[value]
									}}
									key={value}
									label={text}
									labelClasses={[classes.label]}
									labelType={config[selectedKey].type}
									wrapperClasses={[classes.iconWrapper]}
								/>
							) : (
								truncate(text, {
									length: truncateLength
								})
							)
						)
					} else {
						// For everything that is not an icon, render correctly truncated text.
						values = selectedValues.map(({ text }) =>
							truncate(text, { length: truncateLength })
						)
					}

					const keyStr = startCase(allFilters[selectedKey].key.value)

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
