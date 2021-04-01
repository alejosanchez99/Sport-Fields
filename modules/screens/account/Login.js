import React from "react";
import { View,ImageBackground, Image } from "react-native";

import styleView from "../../../shared/styles/StylesView";
import styleImage from "../../../shared/styles/StylesImage";

export default function Login() {

    
  return (
    <View style = {styleView.view}>
      <ImageBackground
        source={require("../../..//assets/images/backgroundLogin.png")}
        style={styleImage.backgroundImageLogin}
      >
        <Image
          source={require("../../../assets/icons/logo.png")}
          resizeMode="contain"
          style={styleImage.imageLogin}
        />
      </ImageBackground>
    </View>
  );
}

