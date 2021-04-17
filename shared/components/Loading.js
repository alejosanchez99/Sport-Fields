import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import colors from '../styles/ColorsApp'

export default function Loading({ isVisible }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor={colors.three}
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}>
            <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
                color={colors.primary}
                animating={true}
            />
        </Overlay>
    )
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#131f27",
        marginTop: 10
    },
    overlay: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0
    },
})