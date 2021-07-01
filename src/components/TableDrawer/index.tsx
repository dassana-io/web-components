import { ModalProvider } from 'components/Modal'
import { TableDrawer as TableDrawerCmp } from './TableDrawer'
import { DataId, TableProps } from '../Table'
import React, { Key, ReactNode } from 'react'

export interface TableDrawerProps<DataType>
	extends Omit<TableProps<DataType>, 'activeRowKey' | 'onRowClick'> {
	containerId?: string
	drawerContainerClasses?: string[]
	renderDrawerCmp: (id: Key, rowData: DataType) => ReactNode
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
