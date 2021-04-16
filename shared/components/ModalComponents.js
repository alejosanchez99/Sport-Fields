import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function ModalComponents({ isVisible, setVisible, children, containerStyle }) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={{ ...containerStyle }}
            onBackdropPress={() => setVisible(false)}
        >
            {
                children
            }

        </Overlay>
    )
}