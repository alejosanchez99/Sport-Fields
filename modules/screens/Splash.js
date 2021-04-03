import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import Account from "../screens/account/Account";
import styleView from "../../shared/styles/StylesView";
import styleImage from "../../shared/styles/StylesImage";
import styleText from "../../shared/styles/StyleText";

export default function Splash() {
  const [time, setTime] = useState(false);

  useEffect(() => {
    componentDidMount();
  }, []);

  const componentDidMount = () => {
    this.timeoutHandle = setTimeout(() => {
      setTime(true);
    }, 3000);
  };

  return time ? (
    <Account login={true}/>
  ) : (
    <View style={styleView.view}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={styleImage.backgroundImage}
      >
        <Image
          source={require("../../assets/icons/logo.png")}
          resizeMode="contain"
          style={styleImage.image}
        />
        <Text style={styleText.title}>Sport Fields</Text>
      </ImageBackground>
    </View>
  );
}
