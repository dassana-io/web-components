import { useEffect, useState } from 'react'

const getWindowSize = () => ({
	height: window.innerHeight,
	width: window.innerWidth
})

export interface WindowSize {
	height: number
	width: number
}

export enum Breakpoints {
	mobile = 480
}

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize())
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => setWindowSize(getWindowSize())

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		windowSize.width <= Breakpoints.mobile
			? setIsMobile(true)
			: setIsMobile(false)
	}, [windowSize])

	return { isMobile, windowSize }
}
