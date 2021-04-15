import React, { useState, useRef } from "react"
import { StyleSheet, ImageBackground, View } from "react-native"
import { Card, Input, Button, Icon } from "react-native-elements"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { isEmpty, size } from "lodash"
import Toast from "react-native-easy-toast"
import RNPickerSelect from 'react-native-picker-select'

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
import colors from "../../../shared/styles/ColorsApp"

export default function AddField({ route, navigation }) {
  const { locationField } = route.params;
  const [formData, setFormData] = useState(defaultFormValues())
  const [enableButton, setEnableButton] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errorText, setErrorText] = useState(null)
  const [titleError, setTitleError] = useState(null)
  const [imagesSelected, setImagesSelected] = useState([])
  const [loading, setLoading] = useState(false)



  const toastRef = useRef()

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
    setEnableButton(validateData())
  };
  const onValueChange = (value, type) => {
    setFormData({ ...formData, [type]: value })
    setEnableButton(validateData())
  };

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
  };

  const validateCorrectEmail = () => {
    let correctEmail = true;
    if (!validateEmail(formData.email)) {
      setTitleError(message.login.errorEmail.title);
      setErrorText(message.login.errorEmail.description)
      setShowModal(true)

      correctEmail = false
    }

    return correctEmail
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
            defaultValue={formData.email}
            onChange={(e) => onChange(e, "priceHour")}
          />
          <View style={styles.phoneView}>
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
              />
            }}
            onValueChange={(value) => onValueChange(value, "typeField")}
          />
        </Card>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          disabled={!enableButton}
          title={message.account.addField.buttonTitle}
          onPress={() => addUserAdmin()}
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
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const defaultFormValues = () => {
  return {
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    priceHour: "",
    country: "CO",
    callingCode: "57"
  }
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
});

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
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
});
