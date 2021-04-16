import React, { useState, useRef } from "react"
import { StyleSheet, ImageBackground } from "react-native"
import { Card, Input, Button } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { isEmpty } from "lodash"
import Toast from "react-native-easy-toast"

import { stylesCard } from "../../../shared/styles/StylesCard"
import { message } from "../../../assets/messages/message"
import { stylesButtonContainer, stylesButton } from "../../../shared/styles/StylesButton"
import { addDocumentWithoutId } from "../../../core/firebase/actions"
import { collectionsFirebase } from "../../../core/firebase/collectionsFirebase"
import { getToastMessage, defaultValueToastView } from "../../../shared/utils/toastMessage"
import { validateEmail } from "../../../shared/utils/helpers"
import styleImage from "../../../shared/styles/StylesImage"
import Header from "../../../shared/components/Header"
import Modal from "../../../shared/components/Modal"
import Loading from "../../../shared/components/Loading"

export default function AddUserAdmin() {
    const [formData, setFormData] = useState(defaultFormValues())
    const [enableButton, setEnableButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const toastRef = useRef()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
        setEnableButton(validateData())
    };

    const validateData = () => {
        let validateSuccessData = true;

        if (isEmpty(formData.email)) {
            validateSuccessData = false;
        }

        return validateSuccessData;
    };

    const validateCorrectEmail = () => {
        let correctEmail = true;
        if (!validateEmail(formData.email)) {
            setTitleError(message.login.errorEmail.title);
            setErrorText(message.login.errorEmail.description);
            setShowModal(true);

            correctEmail = false;
        }

        return correctEmail;
    };

    const addUserAdmin = async () => {
        if (!validateCorrectEmail()) {
            return;
        }

        setLoading(true)

        const responseAddUserAdmin = await addDocumentWithoutId(collectionsFirebase.userAdmin, formData)

        setLoading(false)

        let toastMessage = ""

        responseAddUserAdmin.statusResponse
            ? toastMessage = getToastMessage(true, message.generic.messageCreate)
            : toastMessage = getToastMessage(false)

        toastRef.current.show(toastMessage, defaultValueToastView);
        setFormData(defaultFormValues())
    };


    return (
        <ImageBackground
            source={require("../../..//assets/images/backgroundLogin.png")}
            style={styleImage.backgroundImageLogin}
        >
            <KeyboardAwareScrollView>
                <Header />
                <Card containerStyle={styles.card}>
                    <Input
                        defaultValue={formData.email}
                        onChange={(e) => onChange(e, "email")}
                        placeholder="Correo electronico"
                    />
                </Card>
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    disabled={!enableButton}
                    title={message.account.addUserAdmin.buttonTitle}
                    onPress={() => addUserAdmin()}
                />
                <Modal
                    isVisible={showModal}
                    setVisible={setShowModal}
                    title={titleError}
                    text={errorText}
                />
                <Loading isVisible={loading} />
            </KeyboardAwareScrollView>
            <Toast
             ref={toastRef}
             positionValue={200}
             opacity={0.8}
             textStyle={{ color: "white" }}
             />
        </ImageBackground>
    );
}

const defaultFormValues = () => {
    return { email: "" }
}

const styles = StyleSheet.create({
    button: {
        ...stylesButton,
    },
    buttonContainer: {
        marginTop: 50,
        ...stylesButtonContainer,
    },
    card: {
        marginTop: 50,
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard,
    },
});
