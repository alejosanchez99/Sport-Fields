
import React, { useState, useCallback } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'

import { getFavorites } from "../../../core/firebase/actions"
import Fields from "../../../feature/field/Fields"
import Loading from "../../../shared/components/Loading"
import { size } from 'lodash'
import { message } from '../../../assets/messages/message'
import { stylesButton, stylesButtonContainerSecundary } from '../../../shared/styles/StylesButton'

export default function Favorites({ navigation }) {

    const [fields, setFields] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            if (userLogged) {
                getData()
            }
            setReloadData(false)
        }, [userLogged, reloadData])
    )

    if (!userLogged) {
        return <UserNoLogged navigation={navigation} />
    }

    async function getData() {
        setLoading(true)
        const response = await getFavorites()
        setFields(response.favorites)
        setLoading(false)
    }

    function UserNoLogged({ navigation }) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Icon type="material-community" name="alert-outline" size={150} />
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                    Necesitas estar logueado para ver los favoritos
                </Text>
                <Button
                    containerStyle={styles.buttonContainerLogin}
                    buttonStyle={styles.buttonLogin}
                    title={message.login.login.title}
                    onPress={() => navigation.navigate("user-guest")}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                size(fields) > 0 ?
                    (
                        <FlatList
                            data={fields}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(field) =>
                                <Fields
                                    field={field}
                                    navigation={navigation}
                                    showIconDelete={true}
                                    setReloadData={setReloadData}
                                    setLoading={setLoading}
                                />
                            }
                        />
                    )
                    : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Icon
                                type="material-community"
                                name={"star"}
                                color="#FFBD00"
                                size={150}
                                style={styles.imageNotFound}
                            />
                            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                                Aún no tienes restaurantes favoritos
                            </Text>
                        </View >
                    )
            }
            <Loading
                isVisible={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    buttonLogin: {
        ...stylesButton,
    },
    buttonContainerLogin: {
        marginTop: 30,
        ...stylesButtonContainerSecundary,
    },
}
)
