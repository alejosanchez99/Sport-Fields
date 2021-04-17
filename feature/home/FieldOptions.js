import React from 'react'
import { map } from 'lodash'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Card, Icon } from "react-native-elements"

import colors from '../../shared/styles/ColorsApp'
import { stylesCard } from "../../shared/styles/StylesCard"

export default function FieldOptions() {
    const generateFirstOptions = () => {
        return [
            {
                uri: require("../../assets/images/futbol.png"),
                onPress: () => console.log("prueba")
            },
            {
                uri: require("../../assets/images/tenis.png"),
                onPress: () => console.log("prueba")
            },
            {
                uri: require("../../assets/images/baloncesto.png"),
                onPress: () => console.log("prueba")
            }
        ]
    }

    const generateSecondOptions = () => {
        return [
            {
                uri: require("../../assets/images/futbol-americano.png"),
                onPress: () => console.log("prueba")
            },
            {
                uri: require("../../assets/images/golf.png"),
                onPress: () => console.log("prueba")
            }
        ]
    }

    const menuFirstOptions = generateFirstOptions()
    const menuSecondOptions = generateSecondOptions()

    return (
        <View>
            <View style={styles.containerCard}>
                {
                    map(menuFirstOptions, (menu, index) => (
                        <Card
                            containerStyle={styles.card}
                            key={index}
                        >
                            <TouchableOpacity onPress={menu.onPress}>
                                <Image
                                    style={styles.image}
                                    source={menu.uri}
                                    onPress={menu.onPress}
                                />
                            </TouchableOpacity>
                        </Card>
                    ))
                }
            </View>
            <View style={styles.containerMoreCard}>
                {
                    map(menuSecondOptions, (menu, index) => (
                        <Card
                            containerStyle={styles.card}
                            key={index}
                        >
                            <TouchableOpacity onPress={menu.onPress}>
                                <Image
                                    style={styles.image}
                                    source={menu.uri}
                                    onPress={menu.onPress}
                                />
                            </TouchableOpacity>
                        </Card>
                    ))
                }
                <Card
                    containerStyle={styles.card}
                >
                    <TouchableOpacity onPress={() => console.log("icono")}>
                        <Icon
                            size={50}
                            type="material-community"
                            name="dots-horizontal"
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                </Card>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    containerCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 14
    },
    containerMoreCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 14,
        marginTop: -5
    },
    image: {
        width: 50,
        height: 50,
    },
    card: {
        width: 105,
        height: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        ...stylesCard
    }
})