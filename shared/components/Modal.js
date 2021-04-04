import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Overlay } from "react-native-elements";

import styleText from "../styles/StyleText";
import {
  stylesButtonContainerAlert,
  stylesButton,
} from "../styles/StylesButton";

export default function Modal({ isVisible, setVisible, title, text }) {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => setVisible(false)}
    >
      <Text style={styleText.titleAlert}>{title}</Text>
      <Text style={styleText.textAlert}>{text}</Text>

      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title="Aceptar"
        onPress={() => {
           setVisible(false)
        }}
      />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  button: {
    ...stylesButton,
  },
  buttonContainer: {
    ...stylesButtonContainerAlert,
  },
  overlay: {
    width: "75%",
  },
});
