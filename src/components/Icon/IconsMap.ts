import { ReactComponent as APP_STORE } from '../assets/icons/app-store.svg'
import { ReactComponent as AWS } from '../assets/icons/aws.svg'
import { ReactComponent as AZURE } from '../assets/icons/azure.svg'
import { ReactComponent as DASSANA } from '../assets/icons/dassana.svg'
import { ReactComponent as GITHUB } from '../assets/icons/github.svg'
import { ReactComponent as GOOGLE_CLOUD_PLATFORM } from '../assets/icons/google-cloud-platform.svg'
import { ReactComponent as QUERY_SERVICE } from '../assets/icons/query-service.svg'
import { ReactComponent as SALESFORCE } from '../assets/icons/salesforce.svg'
import { ReactComponent as ZOOM } from '../assets/icons/zoom.svg'

/*
NOTE: When you add an svg, make sure it doesn't have a predefined height and width. The viewbox property dissapears if you try to set the dimensions outside storybook. https://github.com/gregberge/svgr/issues/500

TODO: Find a better rollup plugin that handles importing images as ReactComponent's. 
*/
const Icons = {
	appStore: APP_STORE,
	aws: AWS,
	azure: AZURE,
	dassana: DASSANA,
	github: GITHUB,
	googleCloudService: GOOGLE_CLOUD_PLATFORM,
	queryService: QUERY_SERVICE,
	salesforce: SALESFORCE,
	zoom: ZOOM
}

export default Icons

export type IconName = keyof typeof Icons
