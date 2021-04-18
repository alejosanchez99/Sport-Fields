import React,{useRef} from "react";
import { ImageBackground, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styleImage from "../../../shared/styles/StylesImage";
import Header from "../../../shared/components/Header";
import FormField from "../../../feature/field/FormField";
import Toast from "react-native-easy-toast";

export default function AddField({ route, navigation }) {

  const toastRef = useRef()

  return (
    <ImageBackground
      source={require("../../../assets/images/backgroundLogin.png")}
      style={styleImage.backgroundImageLogin}
    >
      <KeyboardAwareScrollView>
        <Header />
        <FormField route={route} navigation={navigation} toastRef={toastRef} />
      </KeyboardAwareScrollView>
      <Toast
        ref={toastRef}
        positionValue={250}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </ImageBackground>
  );
}
