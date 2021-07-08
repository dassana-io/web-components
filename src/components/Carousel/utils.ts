import { useCallback, useEffect, useRef } from 'react'

export const useAutoPlay = (interval: number, onInterval: () => void): void => {
	const timer = useRef<number>(0)

	const stop = useCallback(() => {
		if (!timer.current) return

		window.clearInterval(timer.current)

		timer.current = 0
	}, [timer])

	const start = useCallback(() => {
		stop()

		if (!interval) return

		timer.current = window.setInterval(onInterval, interval)
	}, [onInterval, interval, stop, timer])

	useEffect(() => {
		start()

		return stop
	}, [start, stop])
}

/**
 * The first two args of wrap are a range, defined as min and max.
 * For the third number that is provided:
 *   - If it lies within the range, it is returned
 *   - If it lies outside the range, it is wrapped back around
 */
export const wrap = (min: number, max: number, v: number): number => {
	const rangeSize = max - min

	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}
