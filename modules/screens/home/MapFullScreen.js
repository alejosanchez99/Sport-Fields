import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import LoadingMap from '../../../shared/components/LoadingMap'

import Map from '../../../shared/components/Map'
import colors from '../../../shared/styles/ColorsApp'
import { map, isNull,isUndefined } from "lodash"

export default function MapFullScreen({route}) {
    const [showLoadingMap, setShowLoadingMap] = useState(true)
    const data = route.params;
    

    return (
        <View style={styles.container}>
            <Map
                fieldsSearch={ data ? data.fieldData : [] }
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
