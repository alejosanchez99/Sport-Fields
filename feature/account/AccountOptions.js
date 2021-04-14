import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Card } from "react-native-elements"
import { StackActions, useNavigation } from "@react-navigation/native"

import colors from '../../shared/styles/ColorsApp'
import { stylesCard } from '../../shared/styles/StylesCard'
import { closeSession, getCollection } from '../../core/firebase/actions'
import { collectionsFirebase } from '../../core/firebase/collectionsFirebase'

export default function AccountOptions({ user }) {

    const [userIsAdmin, setUserIsAdmin] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        (async () => {

            const usersAdmin = await getCollection(collectionsFirebase.userAdmin)

            const existUserAdmin = usersAdmin.data.find((userAdmin) => userAdmin.email === user.email)

            setUserIsAdmin(existUserAdmin)
        })()
    }, [])


    const generateOptions = () => {

        const commonMenuItems = {
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3"
        }

        const menuOptions = [
            {
                title: "Cambiar información personal",
                iconNameLeft: "account-circle",
                ...commonMenuItems,
                onPress: () => navigation.navigate("personal-information", {
                    user: user
                })
            },
            {
                title: "Cambiar contraseña",
                iconNameLeft: "lock-reset",
                ...commonMenuItems,
                onPress: () => navigation.navigate("change-password")
            },
            {
                title: "Cerrar sesión",
                iconNameLeft: "account-remove-outline",
                ...commonMenuItems,
                onPress: () => signOut()
            }
        ]
        if (userIsAdmin) {
            const menuFieldAdminOption = {
                title: "Crear cancha",
                iconNameLeft: "soccer-field",
                ...commonMenuItems,
                onPress: () => console.log("funciona")
            }

            const menuPermissionsAdminOption = {
                title: "Agregar administrador",
                iconNameLeft: "account-plus",
                ...commonMenuItems,
                onPress: () => navigation.navigate("add-user-admin")
            }

            menuOptions.unshift(menuFieldAdminOption, menuPermissionsAdminOption)
        }

        return menuOptions
    }

    const signOut = () => {
        closeSession()
        navigation.dispatch(
            StackActions.replace('user-guest')
        )
    }

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
