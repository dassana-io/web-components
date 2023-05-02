import { UniqueIdentifier } from 'components/Draggable'
import React, {
	forwardRef,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes
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

export default ItemOverlay
