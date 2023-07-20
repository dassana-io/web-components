import { ModalProvider } from 'components/Modal'
import { TableDrawer as TableDrawerCmp } from './TableDrawer'
import { type DataId, type ProcessedTableData, type TableProps } from '../Table'
import React, { type Key, type ReactNode } from 'react'

export interface TableDrawerProps<DataType>
	extends Omit<TableProps<DataType>, 'activeRowKey' | 'onRowClick'> {
	containerId?: string
	drawerContainerClasses?: string[]
	renderDrawerCmp: (
		id: Key,
		rowData: ProcessedTableData<DataType>
	) => ReactNode
	tableContainerClasses?: string[]
}

export const TableDrawer = <DataType extends DataId>({
	containerId = 'table-drawer-wrapper',
	...rest
}: TableDrawerProps<DataType>) => (
	<ModalProvider popupContainerSelector={containerId}>
		<TableDrawerCmp containerId={containerId} {...rest} />
	</ModalProvider>
)
