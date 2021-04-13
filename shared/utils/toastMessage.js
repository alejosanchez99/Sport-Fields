import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { message } from '../../assets/messages/message'

const getMessageSuccess = (isUpdate, isDelete, isCreate) => {
    let messageText = ""

    if (isCreate) {
        messageText = message.generic.messageCreate
    }

    if (isUpdate) {
        messageText = message.generic.messageUpdate
    }

    if (isDelete) {
        messageText = message.generic.messageDelete
    }

    return messageText
}

export const getToastMessage = (successfulOperation = false, isUpdate = false, isDelete = false, isCreate = false) => {
    const messageToast = successfulOperation ?
        (<View style={styles.containerToast}>
            <Icon
                type="material-community"
                color="#009827"
                name="checkbox-marked-circle"
            /><Text style={styles.textToast}>
                {getMessageSuccess(isUpdate, isDelete, isCreate)}
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