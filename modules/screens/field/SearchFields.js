import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, ScrollView } from 'react-native'
import { Input, Icon, Card, Image } from 'react-native-elements'
import { map, isEmpty, size } from "lodash"
import { useFocusEffect } from '@react-navigation/native'

import { stylesCard } from '../../../shared/styles/StylesCard'
import { getAllOptionsSportsCategory } from "../../../core/sportsCategory/sportsCategoryItems"
import { getFields, getMoreFields, searchFields } from "../../../core/firebase/actions"
import Loading from "../../../shared/components/Loading"

export default function SearchFields({ navigation }) {
    const [search, setSearch] = useState("")
    const [fields, setFields] = useState([])
    const [defaultFields, setDefaultFields] = useState([])
    const [startField, setStartField] = useState([])
    const [loading, setLoading] = useState(false)

    const limitFields = 7

    useEffect(() => {
        if (isEmpty(search)) {
            setFields(defaultFields)
            return
        }

        async function getData() {
            const responseFields = await searchFields(search)
            if (responseFields.statusResponse) {
                setFields(responseFields.fields)
            }
        }
        getData()
    }, [search])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getFields(limitFields)
                if (response.statusResponse) {
                    setStartField(response.startField)
                    setFields(response.fields)
                    setDefaultFields(response.fields)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async () => {
        if (!startField) {
            return
        }
        setLoading(true)
        const response = await getMoreFields(limitFields, startField)
        if (response.statusResponse) {
            setStartField(response.startField)
            setFields([...fields, ...response.fields])
        }
        setLoading(false)
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container}>
                <View style={styles.containerItems}>
                    <View style={styles.containerIconBack}>
                        <TouchableOpacity onPress={() => navigation.navigate("home")}>
                            <Icon name="chevron-left" size={50} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerSearchBar}>
                        <Input
                            containerStyle={styles.input}
                            placeholder="Buscar canchas"
                            clearButtonMode="always"
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            leftIcon={
                                <Icon
                                    type="material-community"
                                    name={"magnify"}
                                />
                            }
                            onChangeText={(e) => setSearch(e)}
                        />
                    </View>
                </View>
                <View style={styles.containerCardCategorySports}>
                    <SportsCategory />
                </View>
                <Text style={styles.textHeaderField}>
                    {fields.length + " Canchas"}
                </Text>
                <View style={{ flex: 1 }}>
                    {
                        size(fields) > 0 ?
                            (
                                <FlatList
                                    data={fields}
                                    keyExtractor={(item, index) => index.toString()}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={handleLoadMore}
                                    renderItem={(field) =>
                                        <Fields
                                            field={field}
                                            navigation={navigation}
                                        />
                                    }
                                />
                            )
                            :
                            (
                                <NotFound />
                            )
                    }
                </View>
                <Loading
                    isVisible={loading}
                />
            </View>
        </TouchableWithoutFeedback >
    )
}

function SportsCategory() {
    const sportsCategoryItems = getAllOptionsSportsCategory()

    return (
        <View>
            <Text style={styles.textHeader}>
                Categorías de deportes
            </Text>
            <ScrollView
                style={{ flexDirection: "row" }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {map(sportsCategoryItems, (sportsCategory, index) => (
                    <TouchableOpacity
                        onPress={() => console.log("entre")}
                        key={index}
                    >
                        <View style={styles.containerCardSportCategory}>
                            <Card
                                containerStyle={styles.cardSportCategory}
                            >
                                <Image
                                    style={styles.image}
                                    source={sportsCategory.uri}
                                    onPress={() => console.log("prueba")}
                                />
                            </Card>
                            <Text style={{ fontSize: 12, marginTop: 10, fontWeight: "bold" }}>
                                {sportsCategory.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

function Fields({ field, navigation }) {
    const { name, images, priceHour, typeField, rating } = field.item
    return (
        <View style={styles.containerCardField}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("detail") }
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
                            <View style={{ flexDirection: "row" , justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
                                    {name}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon
                                        type="material-community"
                                        name={"star"}
                                        color="#FFBD00"
                                    />
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4}}>
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
                                    {"$" + priceHour}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        </View >
    )
}

function NotFound() {
    return (
        <View style={styles.containerCardField}>
            <Card containerStyle={styles.card}>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCardCategorySports: {
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 30
    },
    containerCardField: {
        marginTop: 8
    },
    containerItems: {
        flexDirection: "row"
    },
    containerIconBack: {
        marginTop: 60,
        justifyContent: "center"
    },
    containerSearchBar: {
        flexDirection: 'row',
        width: "80%",
        height: 40,
        marginTop: 60,
        alignSelf: "center",
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 10,
        fontSize: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        justifyContent: "center",
        marginTop: 36
    },
    inputContainerStyle: {
        borderBottomColor: 'white'
    },
    card: {
        flexDirection: "row",
        height: 130,
        width: "90%",
        alignSelf: "center",
        ...stylesCard
    },
    containerCardSportCategory: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    cardSportCategory: {
        width: 105,
        height: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        ...stylesCard
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 8
    },
    textHeaderField: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 20,
        marginTop: 8
    },
    image: {
        width: 50,
        height: 50,
    },
    imageField: {
        width: 100,
        height: 100,
        borderRadius: 10
    }
})
