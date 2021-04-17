import React, { useEffect, useState, useLayoutEffect} from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'

import colors from '../../shared/styles/ColorsApp'
import { getCurrentUser } from "../../core/firebase/actions"


export default function SearchField() {
    const [photoUrl, setPhotoUrl] = useState(null)

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
                    type="material-community"
                    name="google-maps"
                    color={colors.black}
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
