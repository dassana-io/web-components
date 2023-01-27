import 'antd/lib/tree-select/style/index.css'
import '../assets/styles/antdBaseStyles.css'
import { TreeSelect as AntDTreeSelect } from 'antd'
import cn from 'classnames'
import { getDataTestAttributeProp } from 'components/utils'
import { processTreeSelectData } from 'components/Tree/utils'
import { SelectSkeleton } from 'components/Select/SingleSelect/SelectSkeleton'
import { TreeProps } from 'components/Tree'
import { useStyles } from 'components/Select/SingleSelect/utils'
import React, { FC } from 'react'

export interface TreeSelectProps extends Omit<TreeProps, 'defaultChecked'> {
	defaultExpandAll?: boolean
	fullWidth?: boolean
	placeholder?: string
}

export const TreeSelect: FC<TreeSelectProps> = ({
	classes = [],
	dataTag,
	defaultExpandAll = true,
	disabled = false,
	fullWidth = false,
	loading = false,
	onChange,
	skeletonBlockCount = 3,
	skeletonTreeNodeCount = 3,
	treeData
}: TreeSelectProps) => {
	const mappedTreeData = processTreeSelectData(treeData)

	const componentClasses = useStyles({ fullWidth })

	const treeClasses = cn(classes)

	let controlledCmpProps = {}

	if (onChange) {
		controlledCmpProps = {
			onChange
		}
	}

	return loading ? (
		<SelectSkeleton />
	) : (
		<div className={componentClasses.container}>
			<AntDTreeSelect
				className={treeClasses}
				disabled={disabled}
				dropdownClassName={componentClasses.dropdown}
				open
				showSearch
				style={{ width: '100%' }}
				treeData={mappedTreeData}
				treeDefaultExpandAll={defaultExpandAll}
				treeNodeFilterProp='title'
				{...controlledCmpProps}
				{...getDataTestAttributeProp('treeSelect', dataTag)}
			/>
		</div>
	)
}
