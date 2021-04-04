import React from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'

import colors from '../../shared/styles/ColorsApp'

export default function SearchField() {
    return (
        <View>
            <View style={styles.container}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size="large"
                    activeOpacity={0.7}
                    source={
                        require("../../assets/icons/avatar-default.jpg")
                    }
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="¿Que cancha quieres hoy?"
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity onPress={() => console.log("prube")}>
                    <Icon
                        containerStyle={styles.location}
                        color={colors.secundary}
                        type="material-community"
                        name="map-marker"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginLeft: 20
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10
    },
    textInput: {
        width: "60%",
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: colors.primary,
        backgroundColor: 'white',
        borderRadius: 14,
        marginLeft: 10,
        fontWeight: "bold"
    },
    location: {
        marginLeft: 2
    }
})
