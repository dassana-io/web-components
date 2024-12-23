import { createUseStyles } from 'react-jss'
import { filterSelectedFilters } from './utils'
import { IconCell } from 'components/Table/IconCell'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'
import { styleguide } from '../assets/styles'
import { Tooltip } from 'components/Tooltip'
import truncate from 'lodash/truncate'
import { Breakpoints, useWindowSize } from '@dassana-io/web-utils'
import {
	type FiltersConfig,
	type FiltersList,
	type ProcessedFilters
} from './types'
import React, { type FC, type ReactNode } from 'react'

const { font, spacing } = styleguide

const truncateLength = 12

const styles = {
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
		'&:not(:last-of-type)': {
			paddingRight: spacing.xs
		}
	}
}

type Classes = Record<keyof typeof styles, string>

const useStyles = createUseStyles(styles)

interface FiltersSummaryProps {
	allFilters: ProcessedFilters
	config?: FiltersConfig
	filtersList: FiltersList
}

const renderConditionallyTruncatedText = (text: string) => {
	const truncatedText = truncate(text, {
		length: truncateLength
	})

	return truncatedText === text ? (
		text
	) : (
		<Tooltip placement='top' title={text}>
			{truncatedText}
		</Tooltip>
	)
}

const renderValuesStr = (values: string[] | ReactNode[], classes: Classes) => {
	const valuesToDisplay = values.slice(0, 2)
	const valuesToHideLength = values.slice(2).length

	return (
		<>
			{valuesToDisplay.map(
				(val: string | ReactNode, valIndex: number) => (
					<span className={classes.valuesReadOnly} key={valIndex}>
						{val}
						{valIndex < valuesToDisplay.length - 1 ? ',' : <></>}
					</span>
				)
			)}
			{valuesToHideLength ? (
				<span>& {valuesToHideLength} more</span>
			) : (
				<></>
			)}
		</>
	)
}

const FiltersSummary: FC<FiltersSummaryProps> = ({
	allFilters,
	config = {},
	filtersList
}: FiltersSummaryProps) => {
	const {
		windowSize: { width }
	} = useWindowSize()

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

	const renderSummary = () => {
		const filteredFiltersList = filterSelectedFilters(filtersList)

		const sliceLength = width > Breakpoints.largeScreen ? 4 : 2

		const filtersToDisplay = filteredFiltersList.slice(0, sliceLength)
		const filtersListToHide = filteredFiltersList.slice(sliceLength)

		return (
			<>
				{filtersToDisplay.map(
					({
						selectedKey,
						selectedOperator = '=',
						selectedValues = []
					}) => {
						let values: string[] | ReactNode[]

						// If selectedKey and config[selectedKey].iconMap exists, render icons
						if (
							config[selectedKey] &&
							config[selectedKey].iconMap
						) {
							const iconMap = config[selectedKey].iconMap ?? {}

							values = selectedValues.map(({ text, value }) =>
								// If value exists in the iconMap, render the icon.
								// Otherwise render correctly truncated text (to prevent "undefined" from being displayed).
								iconMap[value] ? (
									<IconCell
										iconProps={{
											altText: text,
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
									renderConditionallyTruncatedText(text)
								)
							)
						} else {
							// For everything that is not an icon, render correctly truncated text.
							values = selectedValues.map(({ text }) =>
								renderConditionallyTruncatedText(text)
							)
						}

						const keyStr =
							selectedKey in allFilters
								? startCase(allFilters[selectedKey].key.value)
								: selectedKey

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
									{renderValuesStr(values, classes)}
								</span>
								<span className={classes.bracket}>]</span>
							</span>
						)
					}
				)}
				{filtersListToHide.length > 0 ? (
					<span className={classes.filterReadOnly}>
						{filtersListToHide.length} more
					</span>
				) : (
					<></>
				)}
			</>
		)
	}

	return width <= Breakpoints.tablet || isEmpty(allFilters)
		? renderMobileSummary()
		: renderSummary()
}

export default FiltersSummary
