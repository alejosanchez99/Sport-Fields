import { map } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Icon, Card } from "react-native-elements"

import colors from '../../shared/styles/ColorsApp'

export default function AccountOptions() {

    const generateOptions = () => {
        return [
            {
                title: "Cambiar nombres y apellidos",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3"
            },
            {
                title: "Cambiar email",
                iconNameLeft: "at",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3"
            },
            {
                title: "Cambiar contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3"
            },
            {
                title: "Cerrar sesión",
                iconNameLeft: "account-remove-outline",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3"
            }
        ]
    }

    const menuOptions = generateOptions();


    return (
        <View style={styles.container}>
            {
                map(menuOptions, (menu, index) => (
                    <Card containerStyle={styles.card} >
                        <ListItem
                            key={index}
                            style={styles.menuItem}
                            onPress={menu.onPress}
                        >
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
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.gray
    },
    card: {
        padding: 3
    }
})
