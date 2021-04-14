import React, { useState, useRef } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import { StackActions, useNavigation } from "@react-navigation/native";

import { getToastMessage, defaultValueToastView } from "../../../shared/utils/toastMessage";
import { stylesCard } from "../../../shared/styles/StylesCard";
import Header from "../../../shared/components/Header";
import { message } from "../../../assets/messages/message";
import { isEmpty, size } from "lodash";
import styleImage from "../../../shared/styles/StylesImage";
import {
  stylesButtonContainer,
  stylesButton,
} from "../../../shared/styles/StylesButton";
import IconPassword from "../../../shared/components/IconPassword";
import { reauthenticate, updatePassword } from "../../../core/firebase/actions";
import Modal from "../../../shared/components/Modal";

import Loading from "../../../shared/components/Loading";


const defaultFormsValues = () => {
  return { currentPassword: "", newPassword: "", confirmPassword: "" };
};

export default function ChangePassword() {
  const [formData] = useState(defaultFormsValues);
  const [showCurrentPassword, setShowCurrentPassword] = useState(null);
  const [showNewPassword, setNewShowPassword] = useState(null);
  const [showConfirmPassword, setConfirmShowPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [enable, setEnable] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toastRef = useRef()
  const navigation = useNavigation();

  const onChange = (e, type) => {
    formData[type] = e.nativeEvent.text;
    setEnable(validateData());
  };

  const doChangePassword = async () => {
    if (!validateRegister()) {
      return;
    }

    setLoading(true);

    const resultReautheticate = await reauthenticate(formData.currentPassword);

    if (!resultReautheticate.statusResponse) {
      setTitleError(message.login.errorService.title);
      setErrorText(message.login.changeData.errorPassword);
      setShowModal(true);
      setLoading(false);
      return;
    }

    const result = await updatePassword(formData.newPassword);
    setLoading(false)

    if (!result.statusResponse) {
      setTitleError(message.login.register.errorService.title);
      setErrorText(message.login.changeData.errorPasswordDescription);
      setShowModal(true);
      return;
    }


    const toastMessage = getToastMessage(true, message.generic.messageUpdate);
    toastRef.current.show(toastMessage, defaultValueToastView);

    this.timeoutHandle = setTimeout(() => {
      navigation.dispatch(StackActions.popToTop())
    }, 2000);
  };

  const validateRegister = () => {
    if (size(formData.currentPassword) < 7) {
      setTitleError(message.login.errorPassword.title);
      setErrorText(message.login.errorPassword.description);
      setShowModal(true);
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setTitleError(message.login.errorPassword.title);
      setErrorText(message.login.errorPassword.confirm);
      setShowModal(true);
      return false;
    }
    return true;
  };

  const validateData = () => {
    if (isEmpty(formData.currentPassword)) {
      return false;
    }
    if (isEmpty(formData.newPassword)) {
      return false;
    }
    if (isEmpty(formData.confirmPassword)) {
      return false;
    }

    return true;
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
            wre
            placeholder="Contraseña actual"
            onChange={(e) => onChange(e, "currentPassword")}
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
            onChange={(e) => onChange(e, "newPassword")}
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
            onChange={(e) => onChange(e, "confirmPassword")}
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
          disabled={!enable}
          title={message.account.personalInformation.buttonTitle}
          onPress={() => doChangePassword()}
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
        position="center"
        opacity={0.8}
        textStyle={{ color: 'white' }}
      />
    </ImageBackground>
  );
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
