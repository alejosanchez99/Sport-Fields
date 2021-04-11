import React, { useState } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Input, Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { stylesCard } from "../../../shared/styles/StylesCard"
import Header from "../../../shared/components/Header";
import { message } from '../../../assets/messages/message'
import { isEmpty,size } from "lodash"
import styleImage from "../../../shared/styles/StylesImage";
import { stylesButtonContainer, stylesButton } from '../../../shared/styles/StylesButton'
import IconPassword from "../../../shared/components/IconPassword"
import { validateEmail } from '../../../shared/utils/helpers';
import { registerUser , updateProfile,closeSession} from '../../../core/firebase/actions';
import Modal from '../../../shared/components/Modal';
import { StackActions,useNavigation } from '@react-navigation/native';
import Loading from '../../../shared/components/Loading';



const defaultFormsValues = () => {
    return { name: "",email : "", password : "", confirm : ""}
}




export default function Register() {
    const [showNewPassword, setNewShowPassword] = useState(null);
    const [showConfirmPassword, setConfirmShowPassword] = useState(null);
    const [formData] = useState(defaultFormsValues());
    const [errorText, setErrorText] = useState(null)
    const [titleError, setTitleError] = useState(null)
    const [enable, setEnable] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)


    const onChange = (e,type) => {
        formData[type] = e.nativeEvent.text
        setEnable(validateData()) 
    }

    const validateRegister =()=>{
        if(!validateEmail(formData.email)){
            setTitleError(message.login.errorEmail.title)
            setErrorText(message.login.errorEmail.description)
            setShowModal(true)
            return false
        }
        if(size(formData.password) < 7){
            setTitleError(message.login.errorPassword.title)
            setErrorText(message.login.errorPassword.description)
            setShowModal(true)
            return false
        }
        if(formData.password !== formData.confirm){
            setTitleError(message.login.errorPassword.title) 
            setErrorText(message.login.errorPassword.confirm) 
            setShowModal(true)
            return false
        }
        return true
    }

    const validateData = () => {
        if (isEmpty(formData.name)){
            return false
        }
        if (isEmpty(formData.email)){
            return false
        }
        if (isEmpty(formData.password)){
            return false
        }
        if (isEmpty(formData.confirm)){
            return false
        }
       
        return true
    }


  const navigation = useNavigation();


    const doRegisterUser = async() =>{
        if (!validateRegister()){
            return;
        }

        setLoading(true)
        const result = await registerUser(formData.email,formData.password)
        if(!result.statusResponse){
            setTitleError(message.login.register.errorService.title) 
            setErrorText(message.login.register.errorService.description) 
            setShowModal(true)
            return
        }

        const updateName = await updateProfile({displayName: formData.name})
        closeSession()
        if(!updateName.statusResponse){
            console.log("no se guardo el nombre")
        }

        setLoading(false)

        navigation.dispatch(StackActions.popToTop());

    }


    return (
        <ImageBackground
        source={require("../../..//assets/images/backgroundLogin.png")}
        style={styleImage.backgroundImageLogin}
        >
            <KeyboardAwareScrollView>
            <Header/>
            <Card containerStyle={styles.card}>
                <Input
                    wre
                    onChange={(e) => onChange(e,"email")}
                    placeholder="Correo electronico"
                />
                  <Input
                    wre
                    onChange={(e) => onChange(e,"name")}
                    placeholder="Nombre y apellidos"
                />
                <Input
                    placeholder="Contraseña"
                    password={true}
                    secureTextEntry={!showNewPassword}
                    onChange={(e) => onChange(e,"password")}
                    rightIcon={
                        <IconPassword
                            showPassword={showNewPassword}
                            setShowPassword={setNewShowPassword}
                        />
                    }
                />
                <Input
                    placeholder="Confirmación de contraseña"
                    password={true}
                    numberOfLines = {1}
                    onChange={(e) => onChange(e,"confirm")}
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={
                        <IconPassword
                            showPassword={showConfirmPassword}
                            setShowPassword={setConfirmShowPassword}
                        />
                    }
                />
            </Card>
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                disabled={!enable}
                title={message.login.register.buttonTitle}
                onPress={() => doRegisterUser()}
            />
            <Modal isVisible={showModal} setVisible={setShowModal} 
            title={titleError} text={errorText}/>
            </KeyboardAwareScrollView>
            <Loading isVisible={loading}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button: {
        ...stylesButton
    },
    buttonContainer: {
        marginTop: 50,
        ...stylesButtonContainer
    },
    card: {
        width: "80%",
        padding: 30,
        alignSelf: "center",
        ...stylesCard
    }
})
