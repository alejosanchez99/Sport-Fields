import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { stylesCard } from "../../../shared/styles/StylesCard";
import Header from "../../../shared/components/Header";
import { message } from "../../../assets/messages/message";
import styleImage from "../../../shared/styles/StylesImage";
import {
  stylesButtonContainer,
  stylesButton,
} from "../../../shared/styles/StylesButton";
import IconPassword from "../../../shared/components/IconPassword";
import Modal from "../../../shared/components/Modal";
import { validateEmail } from "../../../shared/utils/helpers";
import { loginUserWithEmailAndPassword } from "../../../core/firebase/actions";
import Loading from "../../../shared/components/Loading";

const defaultFormsValues = () => {
  return { email: "", password: "" };
};

export default function Login({route}) {
  const [showPassword, setShowPassword] = useState(null);
  const [formData] = useState(defaultFormsValues());
  const [enable, setEnable] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const { navigate, setRoute } = route.params;

  const onChange = (e, type) => {
    formData[type] = e.nativeEvent.text;
    setEnable(validateData());
  };


  const doLogin = async () => {
    if (!validateLogin()) {
      return;
    }

    setLoading(true)
    const result = await loginUserWithEmailAndPassword(
      formData.email,
      formData.password
    );
    setLoading(false)
    if (!result.statusResponse) {
      setTitleError(message.login.errorService.title);
      setErrorText(message.login.errorService.description);
      setShowModal(true);
      return;
    }
    setRoute("user-logged")
    navigate(true)

  }

  const validateLogin = () => {
    if (!validateEmail(formData.email)) {
      setTitleError(message.login.errorEmail.title);
      setErrorText(message.login.errorEmail.description);
      setShowModal(true);
      return false;
    }
    return true;
  };

  const validateData = () => {
    if (isEmpty(formData.email)) {
      return false;
    }
    if (isEmpty(formData.password)) {
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
            keyboardType="email-address"
            onChange={(e) => onChange(e, "email")}
            placeholder="Correo electronico"
          />
          <Input
            placeholder="Contraseña"
            onChange={(e) => onChange(e, "password")}
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
          disabled={!enable}
          title={message.login.login.buttonTitle}
          onPress={() => doLogin()}
        />

        <Modal
          isVisible={showModal}
          setVisible={setShowModal}
          title={titleError}
          text={errorText}
        />
        <Loading isVisible={loading} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
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
