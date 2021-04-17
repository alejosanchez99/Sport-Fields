import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

export default function MapLocation({ newRegion, setNewRegion }) {

    return (
        <View>
            {
                newRegion && (
                    <MapView
                        style={styles.map}
                        initialRegion={newRegion}
                        showsUserLocation={true}
                        onRegionChange={(region) => setNewRegion(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: newRegion.latitude,
                                longitude: newRegion.longitude
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
    map: {
        width: "100%",
        height: "85%"
    }
})
