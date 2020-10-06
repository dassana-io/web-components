import { ReactComponent as APP_STORE } from '../assets/icons/app-store.svg'
import { ReactComponent as AWS } from '../assets/icons/aws.svg'
import { ReactComponent as AZURE } from '../assets/icons/azure.svg'
import { ReactComponent as DASSANA } from '../assets/icons/dassana.svg'
import { ReactComponent as GOOGLE_CLOUD } from '../assets/icons/google-cloud.svg'
import { ReactComponent as QUERY_SERVICE } from '../assets/icons/query-service.svg'

const Icons = {
	appStore: APP_STORE,
	aws: AWS,
	azure: AZURE,
	dassana: DASSANA,
	'google-cloud': GOOGLE_CLOUD,
	queryService: QUERY_SERVICE
}

export type IconName = keyof typeof Icons

export default Icons
