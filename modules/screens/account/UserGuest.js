import React, { useEffect, useState,useCallback,useRef } from 'react'
import { StyleSheet, Text, ImageBackground, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation, CommonActions, useFocusEffect, StackActions } from "@react-navigation/native";

import Header from "../../../shared/components/Header"
import { message } from '../../../assets/messages/message'
import colors from '../../../shared/styles/ColorsApp'
import styleImage from "../../../shared/styles/StylesImage"
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
    const mountedRef = useRef(true)

    useEffect(() => {
        if (test) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: route },
                    ],
                })
            );
        }
        return () => setNavigate(true);
    }, [test]);

    const signIn = () => {
        navigation.navigate("login", {
            navigate: setNavigate,
            setRoute: setRoute,
        })
    }

    const register = () => {
        navigation.navigate("register")
    }

    return (
        <ImageBackground
            source={require("../../..//assets/images/backgroundLogin.png")}
            style={styleImage.backgroundImageLogin}
        >
            <Header />
            <Text style={styles.title}>
                Si deseas poder utilizar todas las funciones {"\n"} de la App necesitas
                iniciar sesión.
            </Text>
            <View style={styles.container}>
                <Button
                    containerStyle={styles.buttonContainerLogin}
                    buttonStyle={styles.buttonLogin}
                    title={message.login.login.title}
                    onPress={() => { signIn() }}
                />
                <Button
                    containerStyle={styles.buttonContainerRegister}
                    buttonStyle={styles.buttonRegister}
                    titleStyle={styles.textButton}
                    type="outline"
                    title={message.login.register.buttonTitle}
                    onPress={() => { register() }}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
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
