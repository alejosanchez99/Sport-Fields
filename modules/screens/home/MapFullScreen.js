import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import LoadingMap from '../../../shared/components/LoadingMap'

import Map from '../../../shared/components/Map'
import colors from '../../../shared/styles/ColorsApp'

export default function MapFullScreen() {
    const [showLoadingMap, setShowLoadingMap] = useState(true)

    return (
        <View style={styles.container}>
            <Map
                isHome={false}
                setShowLoadingMap={setShowLoadingMap}
            />
            {showLoadingMap &&
                (<LoadingMap />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
});
