import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { message } from '../../assets/messages/message'
import colors from '../styles/ColorsApp'

export default function Loading({isVisible}) {
    return (
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor={colors.three}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}>
          

       <View>
              <ActivityIndicator
                size = "large"
                color= {colors.primary}
              />
              <Text>{message.generic.messageLoading}</Text>
          </View>

        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay : {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#131f27",
        borderWidth: 2,
        borderRadius: 10
    },
    view : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#131f27",
        marginTop: 10
    }
})