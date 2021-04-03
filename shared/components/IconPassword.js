import React from 'react'
import { StyleSheet, } from 'react-native'
import { Icon } from 'react-native-elements'

import colors from "../styles/ColorsApp"

export default function IconPassword({ showPassword, setShowPassword }) {

    return (
        <Icon
            containerStyle={styles.icon}
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => { setShowPassword(!showPassword) }}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        color: colors.secundary
    }
})
