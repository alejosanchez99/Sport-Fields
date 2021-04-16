import React from "react"
import { ImageBackground, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import styleImage from "../../../shared/styles/StylesImage"
import Header from "../../../shared/components/Header"
import FormField from "../../../feature/field/FormField"

export default function AddField({ route, navigation }) {
  return (
    <ImageBackground
      source={require("../../../assets/images/backgroundLogin.png")}
      style={styleImage.backgroundImageLogin}
    >
      <KeyboardAwareScrollView>
        <Header />
        <FormField
          route={route}
          navigation={navigation}
        />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
