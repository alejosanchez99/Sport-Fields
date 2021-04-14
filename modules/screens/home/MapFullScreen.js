import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Map from '../../../shared/components/Map'

export default function MapFullScreen() {
    return (
        <View>
            <Map
                isHome={false}
            />
        </View>
    )
}