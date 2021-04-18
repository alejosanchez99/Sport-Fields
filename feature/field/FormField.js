import React, { useState, useRef } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Card, Input, Button, Icon, Text } from "react-native-elements"
import { isEmpty, isNull, isUndefined, map } from "lodash"
import Toast from "react-native-easy-toast"
import RNPickerSelect from 'react-native-picker-select'
import uuid from "random-uuid-v4"
import CountryPicker from 'react-native-country-picker-modal'

import { stylesCard } from "../../shared/styles/StylesCard"
import { message } from "../../assets/messages/message"
import { stylesButtonContainer, stylesButton } from "../../shared/styles/StylesButton"
import { addDocumentWithoutId, uploadImage } from "../../core/firebase/actions"
import { collectionsFirebase } from "../../core/firebase/collectionsFirebase"
import { getToastMessage, defaultValueToastView } from "../../shared/utils/toastMessage"
import { validateEmail } from "../../shared/utils/helpers"
import Modal from "../../shared/components/Modal"
import Loading from "../../shared/components/Loading"
import colors from "../../shared/styles/ColorsApp"
import UploadImages from "./UploadImages"

export default function FormField({ route, navigation }) {
    const { locationField } = route.params;
    const { availablesDays } = route.params;
    const [formData, setFormData] = useState(defaultFormValues())
    const [enableButton, setEnableButton] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const [titleError, setTitleError] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [country] = useState("CO")

    const toastRef = useRef()

    const onChange = (e, type) => {
        formData[type] = e.nativeEvent.text;
        setEnableButton(validateData())
    }

    const onValueChange = (value, type) => {
        formData[type] = value
        setEnableButton(validateData())
    }

    const validateData = () => {
        let validateSuccessData = true;

        if (isEmpty(formData.name)) {
            validateSuccessData = false;
        }
        if (isEmpty(formData.address)) {
            validateSuccessData = false;
        }
        if (isEmpty(formData.email)) {
            validateSuccessData = false;
        }
        if (isEmpty(formData.priceHour)) {
            validateSuccessData = false;
        }
        if (isEmpty(formData.phone)) {
            validateSuccessData = false;
        }
        if (isEmpty(formData.description)) {
            validateSuccessData = false;
        }

        return validateSuccessData;
    }

    const validateForm = () => {
        let correctEmail = true;
        if (!validateEmail(formData.email)) {
            setTitleError(message.login.errorEmail.title);
            setErrorText(message.login.errorEmail.description)
            setShowModal(true)

            correctEmail = false
        }

        return correctEmail
    }

    const addField = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true)
        const responseUploadImages = await uploadImages()

        const field = {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            priceHour: formData.priceHour,
            callingCode: formData.callingCode,
            phone: formData.phone,
            description: formData.description,
            typeField: formData.typeField,
            location: locationField,
            availablesDays: availablesDays,
            images: responseUploadImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date()
        }

        setLoading(false)
        const responseAddField = await addDocumentWithoutId(collectionsFirebase.fields, field)
        setLoading(false)

        if (!responseAddField.statusResponse) {
            return
        }

        setFormData(defaultFormValues())

        const toastMessage = getToastMessage(true, message.generic.messageCreate)
        toastRef.current.show(toastMessage, defaultValueToastView)

        navigation.navigate("user-logged")
    }

    const uploadImages = async () => {
        const imagesUrl = []

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await uploadImage(image, collectionsFirebase.fields, uuid())
                if (response.statusResponse) {
                    imagesUrl.push(response.url)
                }
            })
        )

        return imagesUrl
    }

    return (
        <View>
            <Card containerStyle={styles.card}>
                <Input
                    placeholder="Nombre"
                    defaultValue={formData.name}
                    onChange={(e) => onChange(e, "name")}
                />
                <Input
                    placeholder="Dirección"
                    defaultValue={formData.address}
                    onChange={(e) => onChange(e, "address")}
                    rightIcon={{
                        type: "material-community",
                        name: "google-maps",
                        color: locationField ? colors.black : colors.primary,
                        onPress: () => navigation.navigate("current-location")
                    }}
                />
                <Input
                    keyboardType="email-address"
                    placeholder="Correo electrónico del sitio"
                    defaultValue={formData.email}
                    onChange={(e) => onChange(e, "email")}
                />
                <Input
                    keyboardType="decimal-pad"
                    placeholder="Precio de la hora"
                    defaultValue={formData.priceHour}
                    onChange={(e) => onChange(e, "priceHour")}
                />
                <View style={styles.phoneView}>
                    <CountryPicker
                        withFlag
                        withCallingCode
                        withFilter
                        withCallingCodeButton
                        containerStyle={styles.countryPicker}
                        countryCode={country}
                        onSelect={(country) => {
                            setFormData({
                                ...formData,
                                "country": country.cca2,
                                "callingCode": country.callingCode[0]
                            })
                        }}
                    />
                    <Input
                        placeholder="Teléfono del sitio"
                        keyboardType="phone-pad"
                        containerStyle={styles.inputPhone}
                        defaultValue={formData.phone}
                        onChange={(e) => onChange(e, "phone")}
                    />
                </View>
                <Input
                    placeholder="Descripción"
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e) => onChange(e, "description")}
                />
                <RNPickerSelect
                    placeholder={{ value: null, label: "Tipo de cancha" }}
                    items={fieldsType}
                    style={{
                        ...pickerStyles,
                        iconContainer: {
                            top: 10,
                            right: 12,
                        },
                    }}
                    doneText="Aceptar"
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => {
                        return <Icon
                            type="material-community"
                            name="arrow-down-bold"
                            color={colors.primary}
                        />
                    }}
                    onValueChange={(value) => onValueChange(value, "typeField")}
                />
                <TouchableOpacity
                    style={styles.containerSchedule}
                    onPress={() => (isUndefined(availablesDays) || isNull(availablesDays)) ?
                        navigation.navigate("add-field-schedule", {
                            availablesDays: []
                        })
                        :
                        navigation.navigate("add-field-schedule", {
                            availablesDays: availablesDays
                        })
                    }
                >
                    <Icon
                        type="material-community"
                        name="clock-outline"
                        color="#7a7a7a"
                        containerStyle={styles.btnContainer}
                    />
                    <Text style={styles.textSchedule}>
                        Seleccionar horarios
                    </Text>
                </TouchableOpacity>
                <UploadImages
                    imagesSelected={imagesSelected}
                    setImagesSelected={setImagesSelected}
                />
            </Card>
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                disabled={!enableButton}
                title={message.account.addField.buttonTitle}
                onPress={() => addField()}
            />
            <Modal
                isVisible={showModal}
                setVisible={setShowModal}
                title={titleError}
                text={errorText}
            />
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.8}
                textStyle={{ color: "white" }}
            />
            <Loading isVisible={loading} />
        </View>
    );
}

const defaultFormValues = () => {
    return {
        name: "",
        address: "",
        email: "",
        priceHour: "",
        country: "CO",
        callingCode: "57",
        phone: "",
        description: "",
        typeField: ""
    }
    setImagesSelected([])
}

const fieldsType =
    [
        { label: 'Futbol', value: 'futbol' },
        { label: 'Baloncesto', value: 'baloncesto' },
        { label: 'Tenis', value: 'tenis' },
        { label: 'Futbol americano', value: 'futbol americano' },
        { label: 'Golf', value: 'golf' }
    ]

const styles = StyleSheet.create({
    button: {
        ...stylesButton,
    },
    buttonContainer: {
        marginTop: 50,
        ...stylesButtonContainer,
        marginBottom: 30
    },
    card: {
        marginTop: 50,
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard,
    },
    containerSchedule: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        height: 40,
        width: "100%",
        backgroundColor: "#e3e3e3",
        borderRadius: 30,
        marginTop: 30,
    },
    textSchedule: {
        marginLeft: 5
    },
    phoneView: {
        width: "75%",
        flexDirection: "row"
    }
})

const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderLeftColor: "white",
        borderTopColor: "white",
        borderRightColor: "white",
        borderRadius: 10,
        color: 'black',
        paddingRight: 30
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderLeftColor: "white",
        borderTopColor: "white",
        borderRightColor: "white",
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    }
})
