import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { map } from "lodash";
import { getCurrentLocation } from '../utils/location'
import { getCollection } from "../../core/firebase/actions"
import { collectionsFirebase } from "../../core/firebase/collectionsFirebase"

export default function Map({ isHome, setShowIconMapFullScren = null, setShowLoadingMap }) {
    const [userLocation, setUserLocation] = useState(null)
    const [fields, setFields] = useState([])

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            const responseField = await getCollection(collectionsFirebase.fields)

            if (response.status && responseField.statusResponse) {
                setUserLocation(response.location)
                isHome && setShowIconMapFullScren(true)
                setShowLoadingMap(false)
                setFields(responseField.data)
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
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude
                            }}
                            image={require("../../assets/icons/currentLocation.png")}
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.bubble}>
                                        <Text style={styles.nameBubble}>
                                            Tu ubicación
                                        </Text>
                                    </View>
                                    <View style={styles.arrowBorder} />
                                    <View style={styles.arrow} />
                                </View>
                            </Callout>
                        </Marker>
                        {
                            map(fields, (field, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: field.location.latitude,
                                        longitude: field.location.longitude
                                    }}
                                    image={require("../../assets/icons/marker.png")}
                                >
                                    <Callout tooltip>
                                        <View>
                                            <View style={styles.bubble}>
                                                <Text style={styles.nameBubble}>
                                                    {field.name}
                                                </Text>
                                                <Text>
                                                    {field.description}
                                                </Text>
                                            </View>
                                            <View style={styles.arrowBorder} />
                                            <View style={styles.arrow} />
                                        </View>
                                    </Callout>
                                </Marker>
                            ))
                        }
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
    },
    bubble: {
        flexDirection: "column",
        alignSelf: "flex-start",
        backgroundColor: "#FFF",
        borderRadius: 6,
        borderColor: "#ccc",
        borderWidth: 0.5,
        padding: 15,
        width: 150
    },
    nameBubble: {
        fontSize: 16,
        marginBottom: 5
    },
    arrow: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#fff",
        borderWidth: 16,
        alignSelf: "center",
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderTopColor: "#007a87",
        borderWidth: 16,
        alignSelf: "center",
        marginTop: -0.5
    }
})
