import AWS from './aws.svg'
import DASSANA_BLUE from './dassana-blue.png'
import DASSANA_ORANGE from './dassana-orange.png'

const Icons = {
	'aws-logo': AWS,
	'dassana-blue': DASSANA_BLUE,
	'dassana-orange': DASSANA_ORANGE
}

export type IconName = keyof typeof Icons

export default Icons
