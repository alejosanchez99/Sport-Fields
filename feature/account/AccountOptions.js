import { map } from 'lodash'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Card } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import { stylesCard } from '../../shared/styles/StylesCard'

export default function AccountOptions() {

    const generateOptions = () => {
        return [
            {
                title: "Cambiar información personal",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => navigation.navigate("personal-information")
            },
            {
                title: "Cambiar contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () =>  navigation.navigate("change-password")
            },
            {
                title: "Cerrar sesión",
                iconNameLeft: "account-remove-outline",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => console.log("prueba")
            }
        ]
    }

    const navigation = useNavigation()    
    const menuOptions = generateOptions()

    return (
        <View style={styles.container}>
            {
                map(menuOptions, (menu, index) => (
                    <Card
                        containerStyle={styles.card}
                        key={index}
                    >
                        <TouchableOpacity onPress={menu.onPress}>
                            <ListItem
                                key={index}
                                style={styles.menuItem}
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
                        </TouchableOpacity>
                    </Card>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray
    },
    card: {
        padding: 3,
        margin: 20,
        ...stylesCard
    }
})
