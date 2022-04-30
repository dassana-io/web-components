import React, {
	forwardRef,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes
} from 'react'

interface ItemOverlayProps {
	children: ReactNode
	id: string
}

const ItemOverlay: ForwardRefExoticComponent<
	ItemOverlayProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ItemOverlayProps>(
	({ children, ...rest }: ItemOverlayProps, ref) => {
		return (
			<div {...rest} ref={ref}>
				{children}
			</div>
		)
	}
)

export default ItemOverlay
