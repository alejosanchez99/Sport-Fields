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
                uri: "https://images.vexels.com/media/users/3/146850/isolated/preview/b314541f49ce483dd4c47d0142a47f77-icono-de-pelota-de-f-uacute-tbol-cl-aacute-sico-by-vexels.png",
                onPress: () => console.log("prueba")
            },
            {
                uri: "https://emojitool.com/img/apple/ios-12.1/tennis-racquet-and-ball-2041.png",
                onPress: () => console.log("prueba")
            },
            {
                uri: "https://images.vexels.com/media/users/3/156544/isolated/preview/82434b96bf5caa8eec0bcd1bcdd219b8-icono-de-pelota-de-baloncesto-by-vexels.png",
                onPress: () => console.log("prueba")
            }
        ]
    }

    const generateSecondOptions = () => {
        return [
            {
                uri: "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/49350/american-football-emoji-clipart-md.png",
                onPress: () => console.log("prueba")
            },
            {
                uri: "https://assets.stickpng.com/images/580b585b2edbce24c47b2afd.png",
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
                                    source={{
                                        uri: menu.uri,
                                    }}
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
                                    source={{
                                        uri: menu.uri,
                                    }}
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