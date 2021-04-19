import React, { useState, useCallback } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import { getCurrentUser } from "../../core/firebase/actions"
import { useFocusEffect } from '@react-navigation/native'


export default function SearchField() {
    const [photoUrl, setPhotoUrl] = useState(null)
    const navigation = useNavigation()
    useFocusEffect(
        useCallback(() => {
            async function getPhotoUrl() {
                const userLogged = getCurrentUser()
                userLogged ? (setPhotoUrl(userLogged.photoURL))
                : setPhotoUrl(null)
            }
            getPhotoUrl()
        }, [])
    )

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
                <TouchableOpacity
                    style={styles.containerInput}
                    onPress={() => navigation.navigate("field")}
                >
                    <TextInput
                        style={styles.textInput}
                        pointerEvents="none"
                        placeholder="¿Qué cancha quieres hoy?"
                        underlineColorAndroid="transparent"
                    />
                </TouchableOpacity>
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
    containerInput: {
        width: "60%",
        height: 50
    },
    textInput: {
        width: "90%",
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
