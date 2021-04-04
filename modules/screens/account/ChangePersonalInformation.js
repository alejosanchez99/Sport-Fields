import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'

import { stylesCard } from "../../../shared/styles/StylesCard"
import { message } from '../../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'
import styleImage from "../../../shared/styles/StylesImage";
import Header from '../../../shared/components/Header'

export default function ChangePersonalInformation() {
    return (
        <ImageBackground
        source={require("../../..//assets/images/backgroundLogin.png")}
        style={styleImage.backgroundImageLogin}
        >
            <Header/>
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
                title={message.account.changePassword.buttonTitle}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button: {
        ...stylesButton
    },
    buttonContainer: {
        marginTop: 50,
        ...stylesButtonContainer
    },
    card: {
        marginTop: 50,
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard
    }
})



