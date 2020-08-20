import AWS from '../../assets/icons/aws.svg'
import DASSANA_BLUE from '../../assets/icons/dassana-blue.png'
import DASSANA_ORANGE from '../../assets/icons/dassana-orange.png'

const Icons = {
	'aws-logo': AWS,
	'dassana-blue': DASSANA_BLUE,
	'dassana-orange': DASSANA_ORANGE
}

export type IconName = keyof typeof Icons

export default Icons
