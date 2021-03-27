import React, { useState, useEffect } from "react";
import { View, Text ,Image,ImageBackground} from "react-native";

import Navigation from "../navigations/Navigation";
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
      setTime(false);
    }, 3000);
  };

  return time ? (
    <Navigation />
  ) : (
      
    <View style={styleView.view}>
      <ImageBackground source={require("../../assets/images/background.png")} style={styleImage.backgroundImage}>
      <Image
        source={require("../../assets/icons/logo.png")}
        resizeMode="contain"
        style={styleImage.image}
      />
      <Text style={styleText.title}>SportFields</Text>
      </ImageBackground>
    </View>
  );
}
