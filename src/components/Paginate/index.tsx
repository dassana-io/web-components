import '../assets/styles/antdAnimations.css'
import 'antd/lib/pagination/style/index.css'
import { Pagination as AntDPagination } from 'antd'
import { PaginationProps as AntDPaginationProps } from 'antd/lib/pagination'
import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import { generatePaginationStyles } from './styles'
import { generateSelectStyles } from 'components/Select/SingleSelect/utils'
import omit from 'lodash/omit'
import {
	generateThemedDropdownStyles,
	generateThemedOptionStyles
} from 'components/Select/utils'
import React, {
	ReactNode,
	RefObject,
	useCallback,
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
	paginationContainer: {
		...flexJustifyEnd,
		...generatePaginationStyles(light),
		...omit(generateSelectStyles(light), '&$error'),
		'& .ant-select-dropdown': generateThemedDropdownStyles(light),
		'& .ant-select-item': generateThemedOptionStyles(light),
		paddingTop: spacing.l
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $paginationContainer': {
				...generatePaginationStyles(dark),
				...omit(generateSelectStyles(dark), '&$error'),
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

	return (
		<div className={cn({ [classes.container]: true }, containerClasses)}>
			<div
				className={cn(
					{ [classes.itemWrapper]: true },
					itemWrapperClasses
				)}
			>
				{data.slice(minVal, maxVal).map((datum, i) => (
					<div className={cn(itemContainerClasses)} key={i}>
						{itemRender(datum)}
					</div>
				))}
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
