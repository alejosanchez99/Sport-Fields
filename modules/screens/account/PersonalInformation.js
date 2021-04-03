import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'

import Header from "../../../shared/components/Header"
import { stylesCard } from "../../../shared/styles/StylesCard"
import { message } from '../../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'

export default function ChangePersonalInformation() {
    return (
        <View>
            <Header />
            <Card containerStyle={styles.card}>
                <Input
                    placeholder="Nombres y apellidos"
                />
                <Input
                    placeholder="Correo electronico"
                />
            </Card>
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                title={message.account.personalInformation.buttonTitle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        ...stylesButton
    },
    buttonContainer: {
        marginTop: 20,
        ...stylesButtonContainer
    },
    card: {
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard
    }
})



