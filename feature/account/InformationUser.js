import React, { useCallback,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import {useFocusEffect} from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import { getCurrentUser } from '../../core/firebase/actions'

export default function InformationUser() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useFocusEffect(
        useCallback(() => {
            const user = getCurrentUser()
            user && (
                setName(user.displayName),
                setEmail(user.email)
                )
        }, [])
    )

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                containerStyle={styles.avatar}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                source={
                    require("../../assets/icons/avatar-default.jpg")
                }
            >
                <Avatar.Accessory
                    onPress={() => console.log("Works!")}
                    style={styles.avatarAccesory}
                    icon={{ name: 'home', type: 'material-community' }}
                />
            </Avatar>
            <View style={styles.InfoUser}>
                <Text style={styles.displayName}>
                   {name}
                </Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: colors.gray,
        paddingVertical: 20
    },
    InfoUser: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    avatarAccesory: {
        height: 30,
        width: 30,
        borderRadius: 30
    }
})