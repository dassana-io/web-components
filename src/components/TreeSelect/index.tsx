import 'antd/lib/tree-select/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import cn from 'classnames'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { type TreeProps } from 'components/Tree'
import { useStyles } from 'components/Select/SingleSelect/utils'
import { useTreeDropdownStyles } from './styles'
import {
	TreeSelect as AntDTreeSelect,
	type TreeSelectProps as AntDTreeSelectProps
} from 'antd'
import {
	getDataTestAttributeProp,
	getPopupContainerProps
} from 'components/utils'
import React, { type FC } from 'react'

type TreeSelectNodeType = AntDTreeSelectProps['treeData']

export interface DTreeSelectProps
	extends Omit<TreeProps, 'defaultChecked' | 'treeData'> {
	defaultExpandAll?: boolean
	dropdownContainerClasses?: string[]
	fullWidth?: boolean
	multipleSelection?: boolean
	placeholder?: string
	popupContainerSelector?: string
	treeData: AntDTreeSelectProps['treeData']
}

export type { TreeSelectNodeType }

export const TreeSelect: FC<DTreeSelectProps> = ({
	classes = [],
	dataTag,
	defaultExpandAll = true,
	disabled = false,
	dropdownContainerClasses = [],
	fullWidth = false,
	loading = false,
	multipleSelection = false,
	onChange,
	popupContainerSelector,
	skeletonBlockCount = 3,
	skeletonTreeNodeCount = 3,
	treeData,
	value
}: DTreeSelectProps) => {
	const componentClasses = useStyles({ fullWidth })
	const dropdownClasses = useTreeDropdownStyles()

	const treeClasses = cn(classes)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange,
			value
		}
	}

	if (value && !onChange) {
		throw new Error('Controlled tree select requires an onChange prop')
	}

	return loading ? (
		<SelectSkeleton fullWidth={fullWidth} />
	) : (
		<div className={componentClasses.container}>
			<AntDTreeSelect
				className={treeClasses}
				disabled={disabled}
				dropdownMatchSelectWidth={false}
				popupClassName={cn(
					{ [dropdownClasses.dropdown]: true },
					dropdownContainerClasses
				)}
				showSearch
				style={{ width: '100%' }}
				treeCheckable={multipleSelection}
				treeData={treeData}
				treeDefaultExpandAll={defaultExpandAll}
				treeNodeFilterProp='title'
				{...getPopupContainerProps(popupContainerSelector)}
				{...controlledCmpProps}
				{...getDataTestAttributeProp('treeSelect', dataTag)}
			/>
		</div>
	)
}
