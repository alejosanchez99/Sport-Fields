import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'
import colors from '../../../shared/styles/ColorsApp'

export default function Home() {
    return (
        <View>
            <View style={styles.container}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size="large"
                    activeOpacity={0.7}
                    source={
                        require("../../../assets/icons/avatar-default.jpg")
                    }
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="¿Que cancha quieres hoy?"
                    underlineColorAndroid="transparent"
                />
                <Icon
                    containerStyle={styles.location}
                    color={colors.secundary}
                    type="material-community"
                    name="map-marker"
                    onPress={() => console.log("prube")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginLeft: 10
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 30
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


