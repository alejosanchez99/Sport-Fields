import React, { useState } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'

import { stylesCard } from "../../../shared/styles/StylesCard"
import Header from "../../../shared/components/Header";
import { message } from '../../../assets/messages/message'
import styleImage from "../../../shared/styles/StylesImage";
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'
import IconPassword from "../../../shared/components/IconPassword"

export default function Register() {
    const [showNewPassword, setNewShowPassword] = useState(null);
    const [showConfirmPassword, setConfirmShowPassword] = useState(null);


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
                    wre
                    placeholder="Nombre y apellidos"
                />
                <Input
                    placeholder="Contraseña"
                    password={true}
                    secureTextEntry={!showNewPassword}
                    rightIcon={
                        <IconPassword
                            showPassword={showNewPassword}
                            setShowPassword={setNewShowPassword}
                        />
                    }
                />
                <Input
                    placeholder="Confirmación de contraseña"
                    password={true}
                    numberOfLines = {1}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                        <IconPassword
                            showPassword={showConfirmPassword}
                            setShowPassword={setConfirmShowPassword}
                        />
                    }
                />
            </Card>
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                title={message.login.register.buttonTitle}
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
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard
    }
})
