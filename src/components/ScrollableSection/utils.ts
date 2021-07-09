import indexOf from 'lodash/indexOf'
import { scroller } from 'react-scroll'

export enum ScrollDirections {
	down = 'down',
	up = 'up'
}

const { down, up } = ScrollDirections

export const scrollOnClick = (
	sections: string[],
	dir: ScrollDirections,
	currentSection: string
) => {
	let idx = indexOf(sections, currentSection)

	if (dir === up && idx !== 0) {
		idx -= 1
	} else if (dir === down && idx < sections.length) {
		idx += 1
	}

	scroller.scrollTo(sections[idx], {
		smooth: true
	})
}
