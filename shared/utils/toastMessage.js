import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { message } from '../../assets/messages/message'


export const getToastMessage = (successfulOperation = false, textToast= "") => {
    const messageToast = successfulOperation ?
        (<View style={styles.containerToast}>
            <Icon
                type="material-community"
                color="#009827"
                name="checkbox-marked-circle"
            /><Text style={styles.textToast}>
                {textToast}
            </Text>
        </View>)
        :
        (<View style={styles.containerToast}>
            <Icon
                type="material-community"
                color="#F00000"
                name="close-circle"
            /><Text style={styles.textToast}>
                {message.generic.messageError}
            </Text>
        </View>)

    return messageToast
}

export const defaultValueToastView  = 2000

const styles = StyleSheet.create({
    containerToast: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textToast: {
        color: "#FFFFFF",
        marginLeft: 4
    }
})