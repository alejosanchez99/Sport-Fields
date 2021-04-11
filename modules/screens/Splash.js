import React, { useState, useEffect ,} from "react";
import { View, Text, Image, ImageBackground } from "react-native";

import Account from "../screens/account/Account";
import styleView from "../../shared/styles/StylesView";
import styleImage from "../../shared/styles/StylesImage";
import styleText from "../../shared/styles/StyleText";
import * as firebase from 'firebase'

export default function Splash() {
  const [time, setTime] = useState(false);
  const [login, setLogin] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      user !== null ? setLogin(true) : setLogin(false)
      componentDidMount()
  })

  }, []);

  const componentDidMount = () => {
    this.timeoutHandle = setTimeout(() => {
      setTime(true);
    }, 1000);
  };

  return time ? (
    <Account login={login}/>
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
