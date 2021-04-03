import React from 'react'
import {  ImageBackground, Image } from "react-native";

import styleImage from "../styles/StylesImage"

export default function Header({ image }) {
    return (
            <ImageBackground
                source={require("../..//assets/images/backgroundLogin.png")}
                style={styleImage.backgroundImageLogin}
            >
                {
                    image &&
                    (
                        <Image
                            source={require("../../assets/icons/logo.png")}
                            resizeMode="contain"
                            style={styleImage.imageLogin}
                        />
                    )
                }
            </ImageBackground>
    )
}
