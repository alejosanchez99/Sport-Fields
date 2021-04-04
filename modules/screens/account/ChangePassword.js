import React, { useState } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'

import { stylesCard } from "../../../shared/styles/StylesCard"
import { message } from '../../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'
import styleImage from "../../../shared/styles/StylesImage";
import IconPassword from "../../../shared/components/IconPassword"
import Header from '../../../shared/components/Header'

export default function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(null);
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
                    placeholder="Contraseña actual"
                    password={true}
                    secureTextEntry={!showCurrentPassword}
                    rightIcon={
                        <IconPassword
                            showPassword={showCurrentPassword}
                            setShowPassword={setShowCurrentPassword}
                        />
                    }
                />
                <Input
                    placeholder="Nueva contraseña"
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
                    placeholder="Confirmación de nueva contraseña"
                    password={true}
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
                title={message.account.personalInformation.buttonTitle}
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



