import React, { useState } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'

import { stylesCard } from "../../../shared/styles/StylesCard"
import Header from "../../../shared/components/Header";
import { message } from '../../../assets/messages/message'
import styleImage from "../../../shared/styles/StylesImage";
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'
import IconPassword from "../../../shared/components/IconPassword"


export default function Login() {
    const [showPassword, setShowPassword] = useState(null);


    return (
        <ImageBackground
        source={require("../../..//assets/images/backgroundLogin.png")}
        style={styleImage.backgroundImageLogin}
        >
            <Header/>
            <Card containerStyle={styles.card}>
                <Input
                    wre
                    placeholder="Correo electronico"
                />
                <Input
                    placeholder="Contraseña"
                    password={true}
                    secureTextEntry={!showPassword}
                    rightIcon={
                        <IconPassword
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    }
                />
            </Card>
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                title={message.login.login.buttonTitle}
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
        marginTop: 100,
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard
    }
})
