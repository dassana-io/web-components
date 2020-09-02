import AWS from '../assets/icons/aws.svg'
import AZURE from '../assets/icons/azure.svg'
import DASSANA_BLUE from '../assets/icons/dassana-blue.png'
import GOOGLE_CLOUD from '../assets/icons/google-cloud.svg'

const Icons = {
	aws: AWS,
	azure: AZURE,
	dassana: DASSANA_BLUE,
	'google-cloud': GOOGLE_CLOUD
}

export type IconName = keyof typeof Icons

export default Icons
