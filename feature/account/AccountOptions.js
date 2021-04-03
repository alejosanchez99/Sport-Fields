import { map } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Icon, Card } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import stylesCard from '../../shared/styles/StylesCard'

export default function AccountOptions() {

    const generateOptions = () => {
        return [
            {
                title: "Cambiar información personal",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("personalInformation")
            },
            {
                title: "Cambiar contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("password")
            },
            {
                title: "Cerrar sesión",
                iconNameLeft: "account-remove-outline",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("signOut")
            }
        ]
    }

    const navigation = useNavigation();

    const selectedComponent = (key) => {
        switch (key) {
            case "personalInformation":
                navigation.navigate("personal-information")
                break
            case "password":
                break
            case "signOut":
                break
        }
    }

    const menuOptions = generateOptions()

    return (
        <View style={styles.container}>
            {
                map(menuOptions, (menu, index) => (
                    <Card containerStyle={styles.card}>
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
    container: {
        backgroundColor: colors.gray
    },
    card: {
        padding: 3,
        ...stylesCard
    }
})
