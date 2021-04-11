import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StackActions, useNavigation, CommonActions} from "@react-navigation/native";

import { message } from '../../../assets/messages/message'
import colors from '../../../shared/styles/ColorsApp'
import {
    stylesButtonSecundary,
    stylesButtonContainerSecundary,
    stylesButtonContainerSecundaryWhite,
    stylesButton,
  } from "../../../shared/styles/StylesButton";

export default function UserGuest() {
    const navigation = useNavigation();
    const [route, setRoute] = useState(null)
    const [test, setNavigate] = useState(false)

    
    useEffect(() => {
        if(test){
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: route },
                  ],
                })
              );
        }
      }, [test]);

    const signIn = () => {
        navigation.navigate("login",{
            navigate: setNavigate,
            setRoute: setRoute,
        }) 
    }

    const register = () => {
        navigation.navigate("register")
    }

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../../assets/icons/avatar-default.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.text}>

            </Text>
            <Text style={styles.description}>

            </Text>
            <Button
                containerStyle={styles.buttonContainerLogin}
                buttonStyle={styles.buttonLogin}
                title={message.login.login.title}
                onPress={() => {signIn()}}
            />
            <Button
                containerStyle={styles.buttonContainerRegister}
                buttonStyle={styles.buttonRegister}
                titleStyle={styles.textButton}
                type="outline"
                title={message.login.register.buttonTitle}
                onPress={() => {register()}}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 20,
    },
    description: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#a65273"
    },
    buttonLogin: {
        ...stylesButton,
    },
    buttonRegister: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        ...stylesButtonSecundary
    },
    buttonContainerLogin: {
        ...stylesButtonContainerSecundary,
    },
    buttonContainerRegister: {
        marginTop: 20,
        ...stylesButtonContainerSecundaryWhite,
    },
    textButton: {
        color: colors.primary,
        textAlign: "center",
    }
})
