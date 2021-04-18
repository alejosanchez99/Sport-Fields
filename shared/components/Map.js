import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import MapView, { Callout, Marker } from 'react-native-maps'
import { map, isNull } from "lodash"

import { getCurrentLocation } from '../utils/location'
import { getCollection } from "../../core/firebase/actions"
import { collectionsFirebase } from "../../core/firebase/collectionsFirebase"
import { message } from '../../assets/messages/message';
import { stylesButton, stylesButtonContainer } from '../styles/StylesButton'

export default function Map({ fieldsSearch = [], isHome, setShowIconMapFullScren = null, setShowLoadingMap, initialLocation = null }) {
    const [userLocation, setUserLocation] = useState(null)
    const [fields, setFields] = useState(fieldsSearch)

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()

            if (response.status) {
                setUserLocation(response.location)
                isHome && setShowIconMapFullScren(true)
                setShowLoadingMap(false)
                console.log(fieldsSearch)
                if (fieldsSearch.length == 0) {
                    const responseField = await getCollection(collectionsFirebase.fields)
                    if (responseField.statusResponse) {
                        setFields(responseField.data)
                    }
                }
            }
        })()
    }, [])

    return (
        <View>
            {
                userLocation && (
                    <MapView
                        style={isHome ? styles.mapViewHome : styles.mapViewFullScren}
                        initialRegion={!isNull(initialLocation) ? initialLocation : userLocation}
                        showsUserLocation={true}
                    >
                        {
                            isNull(initialLocation) &&
                            (<Marker
                                coordinate={{
                                    latitude: userLocation.latitude,
                                    longitude: userLocation.longitude
                                }}
                                image={require("../../assets/icons/currentLocation.png")}
                            />)
                        }
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
                                                <Image
                                                    style={styles.image}
                                                    source={{
                                                        uri: field.images[0]
                                                    }}
                                                />
                                                <Button
                                                    containerStyle={styles.buttonContainer}
                                                    buttonStyle={styles.button}
                                                    title={message.reservation.buttonTitle}
                                                />
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
        width: 150,
        borderRadius: 20
    },
    nameBubble: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
        textAlign: "center"
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
    },
    image: {
        width: 120,
        height: 80,
        borderRadius: 10
    },
    button: {
        ...stylesButton,
        width: 80,
        height: 40
    },
    buttonContainer: {
        marginTop: 15,
        ...stylesButtonContainer,
        width: 80,
        height: 40,
        borderRadius: 40
    },
})
