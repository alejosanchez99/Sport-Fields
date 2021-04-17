import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Card, Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

import Map from "../../shared/components/Map"
import colors from '../../shared/styles/ColorsApp'
import { stylesCard } from '../../shared/styles/StylesCard'
import LoadingMap from '../../shared/components/LoadingMap'

export default function MapFields() {

    const navigation = useNavigation()
    const [showIconMapFullScren, setShowIconMapFullScren] = useState(false)
    const [showLoadingMap, setShowLoadingMap] = useState(true)

    return (
        <View>
            <Card containerStyle={styles.cardMap}>
                <Map
                    isHome={true}
                    showIconMapFullScren={showIconMapFullScren}
                    setShowIconMapFullScren={setShowIconMapFullScren}
                    setShowLoadingMap={setShowLoadingMap}
                />
                {showLoadingMap &&
                    (<LoadingMap />)
                }
                {showIconMapFullScren &&
                    (<Icon
                        type="material-community"
                        name="arrow-expand-all"
                        color={colors.three}
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("map")}
                    />)}
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
