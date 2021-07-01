import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Drawer from './Drawer'
import isEmpty from 'lodash/isEmpty'
import { TableDrawerProps } from './index'
import { useModal } from 'components/Modal'
import { useWindowSize } from 'components/Table/useWindowSize'
import { DataId, Table } from '../Table'
import React, { useState } from 'react'
import { styleguide, themes, ThemeType } from '../assets/styles'

const { borderRadius, spacing } = styleguide
const { dark, light } = ThemeType

const useStyles = createUseStyles({
	container: {
		borderRadius,
		display: 'flex',
		height: '100%',
		overflowX: 'auto',
		width: '100%'
	},
	drawer: {
		flex: 1,
		minWidth: 300,
		overflow: 'auto',
		wordBreak: 'break-word'
	},
	drawerOpen: {
		borderLeft: `1px solid ${themes[light].border}`
	},
	table: {
		padding: `${spacing.m}px ${spacing.l}px`
	},
	tableContainer: {
		flex: 2.5,
		overflow: 'auto',
		padding: spacing.m,
		position: 'relative'
	},
	// eslint-disable-next-line sort-keys
	'@global': {
		[`.${dark}`]: {
			'& $drawerOpen': {
				borderLeft: `1px solid ${themes[dark].border}`
			}
		}
	}
})

export const TableDrawer = <DataType extends DataId>({
	containerId,
	drawerContainerClasses = [],
	renderDrawerCmp,
	tableContainerClasses = [],
	...rest
}: TableDrawerProps<DataType>) => {
	const [rowData, setRowData] = useState({} as DataType)
	const resetRowData = () => setRowData({} as DataType)
	const { isMobile } = useWindowSize()
	const { setModalConfig } = useModal()

	const isRowEmpty = isEmpty(rowData)

	const classes = useStyles()
	const drawerClasses = cn(
		{
			[classes.drawer]: true,
			[classes.drawerOpen]: !isRowEmpty
		},
		drawerContainerClasses
	)

	const onRowClick = (clickedRowData: DataType) => {
		isMobile &&
			setModalConfig({
				content: renderDrawerCmp(rowData.id, clickedRowData)
			})

		return rowData.id === clickedRowData.id
			? resetRowData()
			: setRowData(clickedRowData)
	}

	return (
		<div className={classes.container} id={containerId}>
			<div
				className={cn(
					{ [classes.tableContainer]: true },
					tableContainerClasses
				)}
			>
				<Table<DataType>
					activeRowKey={rowData.id}
					onRowClick={onRowClick}
					{...rest}
				/>
			</div>
			{!isMobile && !isRowEmpty && (
				<Drawer classes={[drawerClasses]} onClose={resetRowData}>
					{renderDrawerCmp(rowData.id, rowData)}
				</Drawer>
			)}
		</div>
	)
}
