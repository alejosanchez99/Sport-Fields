import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import { getCurrentUser } from "../../core/firebase/actions"

export default function SearchField() {
    const [photoUrl, setPhotoUrl] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        const userLogged = getCurrentUser()
        userLogged && (setPhotoUrl(userLogged.photoURL))
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size="large"
                    activeOpacity={0.7}
                    source={
                        photoUrl
                            ? { uri: photoUrl }
                            : require("../../assets/icons/avatar-default.jpg")
                    }
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="¿Qué cancha quieres hoy?"
                    underlineColorAndroid="transparent"
                />
                <Icon
                    containerStyle={styles.location}
                    color={colors.secundary}
                    type="material-community"
                    name="map-marker"
                    onPress={() => navigation.navigate("current-location")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginLeft: 20
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10
    },
    textInput: {
        width: "60%",
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: colors.primary,
        backgroundColor: 'white',
        borderRadius: 14,
        marginLeft: 10,
        fontWeight: "bold"
    },
    location: {
        marginLeft: 2
    }
})
