import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { message } from '../../assets/messages/message'

export default function CardConfirm({ successfulOperation }) {

    useEffect(() => {
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
                                    {message.generic.messageConfirm}
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 30,
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
        margin: 2
    },
    textCard: {
        marginLeft: 10,
        backgroundColor: '#fff'
    }
})