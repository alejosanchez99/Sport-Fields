import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'

import { message } from '../../../assets/messages/Message'
import colors from '../../../shared/styles/ColorsApp'

export default function UserGuest() {
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../../assets/icons/avatar-default.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.text}>

            </Text>
            <Text style={styles.description}>

            </Text>
            <Button
                buttonStyle={styles.button}
                title={message.Login.title}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 20,
    },
    description: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#a65273"
    },
    button: {
        backgroundColor: colors.primary
    }
})
