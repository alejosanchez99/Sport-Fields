import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import LoadingMap from '../../../shared/components/LoadingMap'

import Map from '../../../shared/components/Map'

export default function MapFullScreen({route}) {
    const [showLoadingMap, setShowLoadingMap] = useState(true)
    const data = route.params;

    

    return (
        <View style={styles.container}>
            <Map
                fieldsSearch={ data ? data.fieldData : [] }
                initialLocation={data ? data.fieldData[0].location : null}
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
