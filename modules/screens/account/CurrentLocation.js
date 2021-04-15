import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import colors from "../../../shared/styles/ColorsApp";

import { message } from '../../../assets/messages/message';
import { getCurrentLocation } from '../../../shared/utils/location'
import { stylesButtonContainer, stylesButton } from "../../../shared/styles/StylesButton"
import { getToastMessage, defaultValueToastView } from "../../../shared/utils/toastMessage"
import MapLocaltion from '../../../shared/components/MapLocation'

export default function CurrentLocation({ navigation }) {
    const [newRegion, setNewRegion] = useState(null)
    const [showIcons, setShowIcons] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
                setCurrentLocation(response.location)
            }
        })()
    }, [])

    const confirmLocation = () => {
        console.log(newRegion); 
        navigation.navigate("add-field", {
            locationField: newRegion
        })
    }

    const getLocation = () => {
        setNewRegion(currentLocation)
    }

    return (
        <View>
            <MapLocaltion
                newRegion={newRegion}
                setNewRegion={setNewRegion}
                setShowIcons={setShowIcons}
            />
            {showIcons &&
                (
                    <View style={styles.containerView}>
                        <TouchableOpacity style={styles.container} onPress={getLocation}>
                            <Icon
                                type="material-community"
                                name="plus"
                                color={colors.primary}
                                reverse
                            />
                            <Text style={styles.text}>
                                Ubicación Actual
                            </Text>
                        </TouchableOpacity>
                        <Button
                            containerStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            title={message.generic.saveButton}
                            onPress={confirmLocation}

                        />
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        marginTop: -60
    },
    container: {
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        fontWeight: "bold",
        fontSize: 35
    },
    button: {
        ...stylesButton,
    },
    buttonContainer: {
        marginTop: 40,
        ...stylesButtonContainer,
    }
})