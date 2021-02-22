import { ReactComponent as AWS } from '../../assets/icons/aws.svg'
import { ReactComponent as Azure } from '../../assets/icons/azure.svg'
import { ReactComponent as GoogleCloud } from '../../assets/icons/google-cloud-platform.svg'
import { ImageMapProps } from '../index'
import { ThemeType } from '../../assets/styles'

export enum ImageTypes {
	aws = 'aws',
	azure = 'azure',
	google = 'google'
}

const svgImageMap: ImageMapProps<ImageTypes> = {
	[ImageTypes.aws]: {
		[ThemeType.dark]: AWS,
		[ThemeType.light]: AWS
	},
	[ImageTypes.azure]: {
		[ThemeType.dark]: Azure,
		[ThemeType.light]: Azure
	},
	[ImageTypes.google]: {
		[ThemeType.dark]: GoogleCloud,
		[ThemeType.light]: GoogleCloud
	}
}

export default svgImageMap
