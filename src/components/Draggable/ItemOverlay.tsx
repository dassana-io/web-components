import { type UniqueIdentifier } from 'components/Draggable'
import React, {
	forwardRef,
	type ForwardRefExoticComponent,
	type ReactNode,
	type RefAttributes
} from 'react'

interface ItemOverlayProps {
	children: ReactNode
	id: UniqueIdentifier
}

const ItemOverlay: ForwardRefExoticComponent<
	ItemOverlayProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ItemOverlayProps>(
	({ children, id, ...rest }: ItemOverlayProps, ref) => (
		<div id={String(id)} {...rest} ref={ref}>
			{children}
		</div>
	)
)

ItemOverlay.displayName = 'ItemOverlay'

export default ItemOverlay
