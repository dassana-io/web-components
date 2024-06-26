import '../assets/styles/antdAnimations.css'
import 'antd/lib/pagination/style/index.css'
import { Pagination as AntDPagination } from 'antd'
import { type PaginationProps as AntDPaginationProps } from 'antd/lib/pagination'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generatePaginationStyles } from './styles'
import { generateSelectStyles } from 'components/Select/SingleSelect/utils'
import { PageLoader } from 'components/PageLoader'

import {
	generateThemedDropdownStyles,
	generateThemedOptionStyles
} from 'components/Select/utils'
import React, {
	type ReactNode,
	type RefObject,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'
import { styleguide, ThemeType } from '../assets/styles'

const { dark, light } = ThemeType

const { flexDown, flexJustifyEnd, spacing } = styleguide

const useStyles = createUseStyles({
	container: {
		...flexDown
	},
	itemWrapper: {
		...flexDown
	},
	pageLoader: {
		height: '100%'
	},
	paginationContainer: {
		...flexJustifyEnd,
		...generatePaginationStyles(light),
		...generateSelectStyles(light, {}, false),
		'& .ant-select-dropdown': generateThemedDropdownStyles(light),
		'& .ant-select-item': generateThemedOptionStyles(light),
		paddingTop: spacing.l
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $paginationContainer': {
				...generatePaginationStyles(dark),
				...generateSelectStyles(dark, {}, false),
				'& .ant-select-dropdown': generateThemedDropdownStyles(dark),
				'& .ant-select-item': generateThemedOptionStyles(dark)
			}
		}
	}
})

export interface PaginateProps<T>
	extends Pick<
		AntDPaginationProps,
		| 'defaultPageSize'
		| 'hideOnSinglePage'
		| 'showSizeChanger'
		| 'pageSizeOptions'
		| 'size'
	> {
	containerClasses?: string[]
	data: T[]
	itemContainerClasses?: string[]
	itemWrapperClasses?: string[]
	itemRender: (data: T) => ReactNode
	loading?: boolean
	pageLoaderClasses?: string[]
	paginationContainerRef?: RefObject<HTMLDivElement>
}

// eslint-disable-next-line comma-spacing
export const Paginate = <Data,>({
	containerClasses = [],
	data,
	defaultPageSize = 10,
	hideOnSinglePage = true,
	itemContainerClasses = [],
	itemWrapperClasses = [],
	itemRender,
	loading = false,
	pageLoaderClasses = [],
	paginationContainerRef,
	showSizeChanger = true,
	...rest
}: PaginateProps<Data>) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(defaultPageSize)

	const { minVal, maxVal } = useMemo(
		() => ({
			maxVal: currentPage * pageSize,
			minVal: (currentPage - 1) * pageSize
		}),
		[currentPage, pageSize]
	)

	const classes = useStyles()

	const handlePageSizeChange = useCallback(
		(_currPage: number, newPageSize: number) => setPageSize(newPageSize),
		[]
	)

	useEffect(() => setCurrentPage(1), [data.length, pageSize])

	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			<div
				className={cn(
					{ [classes.itemWrapper]: true },
					itemWrapperClasses
				)}
			>
				{loading ? (
					<PageLoader
						classes={[
							cn(
								{ [classes.pageLoader]: true },
								pageLoaderClasses
							)
						]}
					/>
				) : (
					data.slice(minVal, maxVal).map((datum, i) => (
						<div className={cn(itemContainerClasses)} key={i}>
							{itemRender(datum)}
						</div>
					))
				)}
			</div>
			<div
				className={classes.paginationContainer}
				ref={paginationContainerRef}
			>
				<AntDPagination
					current={currentPage}
					defaultCurrent={1}
					defaultPageSize={pageSize}
					hideOnSinglePage={hideOnSinglePage}
					onChange={setCurrentPage}
					onShowSizeChange={handlePageSizeChange}
					pageSize={pageSize}
					showSizeChanger={showSizeChanger}
					total={data.length}
					{...rest}
				/>
			</div>
		</div>
	)
}
