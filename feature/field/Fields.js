import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Text, Alert } from 'react-native'
import { Icon, Card, Image } from 'react-native-elements'

import { stylesCard } from '../../shared/styles/StylesCard'
import { deleteFavorite } from "../../core/firebase/actions"
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Fields({ field, navigation, showIconDelete = false, setReloadData = null, setLoading = null }) {
    const { name, images, priceHour, typeField, rating, id } = field.item

    const goDetail = () => {
        navigation.navigate("detail",{fields: field.item})
    }

    const confirmRemoveFavorite = () => {
        Alert.alert(
            "Eliminar la cancha de favoritos",
            "¿Está seguro que quieres borrar la cancha de favoritos?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: removeFavorite
                }
            ],
            { cancelable: false }
        )
    }

    const removeFavorite = async () => {
        setLoading(true)
        await deleteFavorite(id)
        setLoading(false)
        setReloadData(true)
    }

    return (
        <View style={styles.containerCardField}>
            <TouchableWithoutFeedback
                onPress={() => goDetail()}
            >
                <Card containerStyle={styles.card}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.imageField}
                            source={{
                                uri: images[0]
                            }}
                        />
                        <View style={{ flexDirection: "column", marginLeft: 15, width: "65%" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
                                    {name}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon
                                        type="material-community"
                                        name={"star"}
                                        color="#FFBD00"
                                    />
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
                                        {rating}
                                    </Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 13, color: "#C3C3C3", marginBottom: 4 }}>
                                {typeField}
                            </Text>
                            <View
                                style={{
                                    backgroundColor: "#8FDC97",
                                    alignSelf: 'flex-start',
                                    alignItems: "center",
                                    borderRadius: 10,
                                    padding: 4,
                                    marginTop: 3
                                }}>
                                <Text style={{ textAlign: "center" }}>
                                    {"$" + Intl.NumberFormat({ style: 'currency', currency: 'CO' }).format(priceHour)}
                                </Text>
                            </View>
                            {
                                showIconDelete &&
                                (<View style={{ alignSelf: "flex-end" }}>
                                    <Icon
                                        type="material-community"
                                        name="trash-can-outline"
                                        color="#B60000"
                                        reverse
                                        size={14}
                                        containerStyle={styles.btnContainer}
                                        onPress={() => confirmRemoveFavorite()}
                                    />
                                </View>)
                            }
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        </View >
    )
}

const styles = StyleSheet.create({
    containerCardField: {
        marginTop: 8
    },
    card: {
        flexDirection: "row",
        height: 130,
        width: "90%",
        alignSelf: "center",
        ...stylesCard
    },
    imageField: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    btnContainer: {
        position: "absolute",
        bottom: -30,
        right: -6,
        shadowColor: "black",
        shadowOpacity: 0.5
    }
})
