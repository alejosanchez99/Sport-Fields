import React from "react";
import { map } from 'lodash'
import { ListItem, Icon, Card } from "react-native-elements";
import { StyleSheet, ImageBackground } from "react-native";

import Header from "../../../shared/components/Header";
import { useNavigation } from "@react-navigation/native";
import { stylesCard } from "../../../shared/styles/StylesCard";
import colors from "../../../shared/styles/ColorsApp";
import styleImage from "../../../shared/styles/StylesImage";
import { Text } from "react-native";

export default function MenuAccount({setNavigation}) {

  const generateOptions = () => {
    return [
      {
        title: "Iniciar sesión",
        iconNameLeft: "login",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("login"),
      },
      {
        title: "Registrarse",
        iconNameLeft: "clipboard-text",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("register"),
      },
      {
        title: "Invitado",
        iconNameLeft: "incognito",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("guest"),
      },
    ];
  };

  const navigation = useNavigation();

  const selectedComponent = (key) => {
    switch (key) {
      case "login":
        navigation.navigate("login");
        break;
      case "register":
        navigation.navigate("register");
        break;
      case "guest":
        setNavigation(true)
        break;
    }
  };

  const menuOptions = generateOptions();

  return (
    <ImageBackground
    source={require("../../..//assets/images/backgroundLogin.png")}
    style={styleImage.backgroundImageLogin}
    >
      <Header/>
      <Text style={styles.title}>Si deseas poder utilizar todas las funciones {"\n"} de la App necesitas iniciar sesión.</Text>
      {map(menuOptions, (menu, index) => (
        <Card containerStyle={styles.card}>
          <ListItem key={index}
           style={styles.menuItem} onPress={menu.onPress}>
            <Icon
              type="material-community"
              name={menu.iconNameLeft}
              color={menu.iconColorLeft}
            />
            <ListItem.Content>
              <ListItem.Title>{menu.title}</ListItem.Title>
            </ListItem.Content>
            <Icon
              type="material-community"
              name={menu.iconNameRight}
              color={menu.iconColorRight}
            />
          </ListItem>
        </Card>
      ))}
   
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
  },
  title: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  card: {
    padding: 4,
    margin: 25,
    ...stylesCard,
  },
});
