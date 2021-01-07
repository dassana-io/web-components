import { Spin as AntDSpin } from 'antd'
import { createUseStyles } from 'react-jss'
import { LoadingOutlined } from '@ant-design/icons'
import { styleguide } from 'components/assets/styles'
import React, { FC } from 'react'

const {
	colors: { blacks }
} = styleguide

const useStyles = createUseStyles({
	loading: {
		'&.anticon': {
			color: blacks['lighten-50'],
			fontSize: ({ size }) => size
		}
	}
})

interface SpinProps {
	size?: number
}

export const Spin: FC<SpinProps> = ({ size = 16 }) => {
	const classes = useStyles({ size })

	return (
		<AntDSpin
			indicator={<LoadingOutlined className={classes.loading} spin />}
		/>
	)
}
