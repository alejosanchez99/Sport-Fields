import React, { useState, useRef } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Card, Input, Button } from "react-native-elements";
import { useNavigation, StackActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty } from "lodash";
import Toast from "react-native-easy-toast";

import { stylesCard } from "../../../shared/styles/StylesCard";
import { message } from "../../../assets/messages/message";
import {
  stylesButtonContainer,
  stylesButton,
} from "../../../shared/styles/StylesButton";
import styleImage from "../../../shared/styles/StylesImage";
import Header from "../../../shared/components/Header";
import { validateEmail } from "../../../shared/utils/helpers";
import Modal from "../../../shared/components/Modal";
import Loading from "../../../shared/components/Loading";
import {
  updateEmail,
  updateProfile,
  reauthenticate,
} from "../../../core/firebase/actions";
import IconPassword from "../../../shared/components/IconPassword";
import { getToastMessage } from "../../../shared/utils/toastMessage";

const defaultFormsValues = ({nameUser,emailUser}) => {
  return { email: emailUser, name: nameUser, password: "" };
};

export default function ChangePersonalInformation({route, navigate} ) {
  const { user } = route.params;
  const [formData] = useState(defaultFormsValues({nameUser: user.displayName, emailUser : user.email}));
  const [enable, setEnable] = useState(false);
  const [showPassword, setShowPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();
  const navigation = useNavigation();

   console.log(user)

  const onChange = (e, type) => {
    formData[type] = e.nativeEvent.text;
    setEnable(validateData());
  };

  const validateData = () => {
    if (isEmpty(formData.email)) {
      return false;
    }
    if (isEmpty(formData.name)) {
      return false;
    }
    return true;
  };

  const changeInformation = async () => {
    if (!validateLogin()) {
      return;
    }

    setLoading(true);

    const resultReautheticate = await reauthenticate(formData.password);

    if (!resultReautheticate.statusResponse) {
      setTitleError(message.login.errorService.title);
      setErrorText(message.login.errorService.description);
      setShowModal(true);
      setLoading(false);
      return;
    }

    const result = await updateEmail(formData.email);

    if (!result.statusResponse) {
      console.log(result.error);
      setTitleError(message.login.errorService.title);
      setErrorText(message.generic.messageError);
      setShowModal(true);
      setLoading(false);
      return;
    }

    const resultEmail = await updateProfile({ displayName: formData.name });
    setLoading(false);

    if (!resultEmail.statusResponse) {
      console.log(resultEmail.error);
      setTitleError(message.login.errorService.title);
      setErrorText(message.generic.messageError);
      setShowModal(true);
      return;
    }

    const toastMessage = getToastMessage(true, message.generic.messageUpdate);
    toastRef.current.show(toastMessage, 2000);

    this.timeoutHandle = setTimeout(() => {
      navigation.dispatch(StackActions.popToTop())
    }, 2000);
    
  };

  const validateLogin = () => {
    if (!validateEmail(formData.email)) {
      setTitleError(message.login.errorEmail.title);
      setErrorText(message.login.errorEmail.description);
      setShowModal(true);
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
            defaultValue={formData.name}
            onChange={(e) => onChange(e, "name")}
            placeholder="Nombres y apellidos"
          />
          <Input
            defaultValue={formData.email}
            onChange={(e) => onChange(e, "email")}
            placeholder="Nuevo correo electronico"
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
          title={message.account.changePassword.buttonTitle}
          onPress={() => changeInformation()}
        />
        <Modal
          isVisible={showModal}
          setVisible={setShowModal}
          title={titleError}
          text={errorText}
        />
          <Toast
            ref={toastRef}
            position= "center"
            opacity={0.8}
            textStyle={{ color: "white" }}
          />
        <Loading isVisible={loading} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    ...stylesButton,
  },
  buttonContainer: {
    marginTop: 40,
    ...stylesButtonContainer,
  },
  card: {
    marginTop: 40,
    width: "80%",
    padding: 30,
    alignSelf: "center",
    ...stylesCard,
  },
});
