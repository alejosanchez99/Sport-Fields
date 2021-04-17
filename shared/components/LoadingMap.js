import React from 'react'
import { ActivityIndicator } from 'react-native'

import colors from '../styles/ColorsApp'

export default function LoadingMap() {
    return (
        <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={true}
        />
    )
}