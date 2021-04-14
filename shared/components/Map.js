import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

import { getCurrentLocation } from '../utils/location'

export default function Map({ isHome, setShowIconMapFullScren }) {
    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setUserLocation(response.location)
                setShowIconMapFullScren(true)
            }
        })()
    }, [])

    return (
        <View>
            {
                userLocation && (
                    <MapView
                        style={isHome ? styles.mapViewHome : styles.mapViewFullScren}
                        initialRegion={userLocation}
                        showsUserLocation={true}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mapViewHome: {
        width: 340,
        height: 270
    },
    mapViewFullScren: {
        width: "100%",
        height: "100%"
    }
})
