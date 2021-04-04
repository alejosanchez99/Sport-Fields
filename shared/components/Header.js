import React from "react";
import { Image, View } from "react-native";

import styleImage from "../styles/StylesImage";
import styleView from "../styles/StylesView";

export default function Header() {
  return (
    <View
      style={styleView.viewHeader}
    >
      <Image
        source={require("../../assets/icons/logo.png")}
        resizeMode="contain"
        style={styleImage.imageLogin}
      />
    </View>
  );
}
