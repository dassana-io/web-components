import AWS from '../assets/icons/aws.svg'
import DASSANA_BLUE from '../assets/icons/dassana-blue.png'

const Icons = {
	aws: AWS,
	dassana: DASSANA_BLUE
}

export type IconName = keyof typeof Icons

export default Icons
