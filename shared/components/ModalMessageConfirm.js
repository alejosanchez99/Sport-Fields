import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { message } from '../../assets/messages/message'

export default function ModalMessageConfirm({ successfulOperation = false, isUpdate = false, isDelete = false, isCreate = false }) {

    useEffect(() => {
        console.log("object");
        functionFadeIn()
        const timer = setTimeout(() => functionFadeOut(), 3000)
        return () => clearTimeout(timer)
    }, [])

    const fadeAnimation = useRef(new Animated.Value(0)).current

    const functionFadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }
    const functionFadeOut = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const getMessage = () => {
        let messageText = ""

        if (isCreate) {
            messageText = message.generic.messageCreate
        }

        if (isUpdate) {
            messageText = message.generic.messageUpdate
        }

        if (isDelete) {
            messageText = message.generic.messageDelete
        }

        return messageText
    }

    return (
        <View style={styles.container}>
            <Animated.View style={{
                opacity: fadeAnimation
            }}>
                <Card containerStyle={styles.card}>
                    {
                        successfulOperation ?
                            (<View style={styles.containerCard}>
                                <Icon
                                    type="material-community"
                                    color="#009827"
                                    name="checkbox-marked-circle"
                                /><Text style={styles.textCard}>
                                    {getMessage()}
                                </Text>
                            </View>)
                            :
                            (<View style={styles.containerCard}>
                                <Icon
                                    type="material-community"
                                    color="#F00000"
                                    name="close-circle"
                                /><Text style={styles.textCard}>
                                    {message.generic.messageError}
                                </Text>
                            </View>)
                    }
                </Card>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute"
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 40,
        padding: 10,
        margin: 20,
        borderRadius: 5
    },
    containerCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 2,
        marginTop: 80
    },
    textCard: {
        marginLeft: 10,
        backgroundColor: '#fff'
    }
})