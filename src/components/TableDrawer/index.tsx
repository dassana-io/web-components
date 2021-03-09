import cn from 'classnames'
import { createUseStyles } from 'react-jss'
import Drawer from './Drawer'
import isEmpty from 'lodash/isEmpty'
import { ColumnType, DataId, Table } from '../Table'
import React, { Key, ReactNode, useState } from 'react'
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

export interface TableDrawerProps<DataType> {
	columns: ColumnType[]
	data: DataType[]
	loading: boolean
	renderDrawerCmp: (id: Key, rowData: DataType) => ReactNode
	renderTableControls?: () => ReactNode
}

export const TableDrawer = <DataType extends DataId>({
	columns,
	data,
	loading,
	renderDrawerCmp,
	renderTableControls
}: TableDrawerProps<DataType>) => {
	const [rowData, setRowData] = useState({} as DataType)
	const resetRowData = () => setRowData({} as DataType)

	const isRowEmpty = isEmpty(rowData)

	const classes = useStyles()
	const drawerClasses = cn({
		[classes.drawer]: true,
		[classes.drawerOpen]: !isRowEmpty
	})

	const onRowClick = (clickedRowData: DataType) =>
		rowData.id === clickedRowData.id
			? resetRowData()
			: setRowData(clickedRowData)

	return (
		<div className={classes.container}>
			<div className={classes.tableContainer}>
				{renderTableControls && renderTableControls()}
				<Table<DataType>
					activeRowKey={rowData.id}
					columns={columns}
					data={data}
					loading={loading}
					onRowClick={onRowClick}
				/>
			</div>
			{!isRowEmpty && (
				<Drawer classes={[drawerClasses]} onClose={resetRowData}>
					{renderDrawerCmp(rowData.id, rowData)}
				</Drawer>
			)}
		</div>
	)
}