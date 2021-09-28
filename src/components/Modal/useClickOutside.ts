import { RefObject, useEffect, useRef } from 'react'

interface UseClickOutseConfig {
	callback: (key?: string) => void
	containingRef?: RefObject<any>
	/* The keys which will trigger the callback. Defaults to ['Escape'] */
	keys?: string[]
}

export const useClickOutside = ({
	callback,
	containingRef,
	keys = ['Escape']
}: UseClickOutseConfig) => {
	const ref = useRef(null)

	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			if (keys.includes(e.key)) {
				callback(e.key)
			}
		}

		const clickListener = (e: MouseEvent) => {
			if (ref.current && !(ref.current as any).contains(e.target)) {
				callback()
			}
		}

		const currContainingRef = containingRef && containingRef.current

		if (currContainingRef) {
			currContainingRef.addEventListener('click', clickListener)
		} else {
			document.addEventListener('click', clickListener)
		}

		document.addEventListener('keyup', keyListener)

		return () => {
			if (currContainingRef) {
				currContainingRef.removeEventListener('click', clickListener)
			} else {
				document.removeEventListener('click', clickListener)
			}

			document.removeEventListener('keyup', keyListener)
		}
	}, [keys, callback, containingRef])

	return ref
}
