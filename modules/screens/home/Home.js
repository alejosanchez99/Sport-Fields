import React from 'react'
import { ScrollView, SafeAreaView, Text, StyleSheet } from 'react-native'

import FieldOptions from '../../../feature/home/FieldOptions'
import SearchField from "../../../feature/home/SearchField"
import MapFields from "../../../feature/home/MapFields"
import { View } from 'react-native'
import colors from '../../../shared/styles/ColorsApp'

export default function Home() {
    return (
        <SafeAreaView >
            <ScrollView>
                <SearchField />
                <View style={styles.containerText}>
                    <Text style={styles.titleText}>
                        Canchas deportivas
                    </Text>
                    <Text style={styles.titleDescription}>
                        Selecciona la cancha acorde a tu preferencia
                    </Text>
                </View>
                <FieldOptions />
                <View style={styles.containerText}>
                    <Text style={styles.titleText}>
                        Canchas cerca a tu ubicación
                    </Text>
                    <Text style={styles.titleDescription}>
                        Busca las canchas mas cercanas a tu ubicación
                    </Text>
                </View>
                <View style={styles.viewMap}>
                    <MapFields />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    containerText: {
        marginLeft: 30,
        marginBottom: -19,
        marginTop: 25,
        textAlign: "left",
        flexDirection: "column"
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    titleDescription: {
        marginTop: 2,
        color: colors.secundary,
        fontSize: 13,
        fontWeight: "bold",
    },
    viewMap: {
        marginTop: 10
    }
})




