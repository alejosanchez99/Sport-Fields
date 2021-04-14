import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import Map from "../../shared/components/Map"
import colors from '../../shared/styles/ColorsApp'
import { stylesCard } from '../../shared/styles/StylesCard'

export default function MapFields() {

    const navigation = useNavigation();

    return (
        <View>
            <Card containerStyle={styles.cardMap}>
                <Map isHome={true} />
                <Icon
                    type="material-community"
                    name="arrow-expand-all"
                    color={colors.three}
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("map")}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    cardMap: {
        marginTop: 20,
        width: "90%",
        padding: 50,
        height: 300,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        ...stylesCard
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOpacity: 0.5
    }
})
