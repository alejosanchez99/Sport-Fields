import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import ModalComponents from "../../shared/components/ModalComponents"
import DateTimePicker from '@react-native-community/datetimepicker'

import { stylesCard } from '../../shared/styles/StylesCard'
import { message } from '../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from "../../shared/styles/StylesButton"

export default function ChooseScheduleTime({ showModal, setShowModal, setInformationFieldSchedule }) {
    const [dateEntryTime, setDateEntryTime] = useState(new Date())
    const [dateExitTime, setDateExitTime] = useState(new Date())
    const [mode] = useState('time')
    const [entryTime, setEntryTime] = useState(null)
    const [exitTime, setExitTime] = useState(null)

    const addTimeSchedule = () => {
        const timeSchedule = {
            createDate: new Date(),
            entryTime: entryTime,
            exitTime: exitTime
        }

        setInformationFieldSchedule(timeSchedule)
        setShowModal(false)
    }

    const onChange = (event, selectedDate, selectDateTimePicker) => {
        const currentDate = selectedDate || time
        const time = currentDate.getHours() + ":" + currentDate.getMinutes()

        if (selectDateTimePicker === "entryTime") {
            setDateEntryTime(currentDate)
            setExitTime(time)
        }
        if (selectDateTimePicker === "exitTime") {
            setDateExitTime(currentDate)
            setEntryTime(time)
        }
    }

    return (
        <ModalComponents
            isVisible={showModal}
            setVisible={setShowModal}
            containerStyle={styles.card}
        >
            <View style={styles.viewContainer}>
                <View style={styles.containerText}>
                    <Text style={styles.headerText}>
                        Horarios
                    </Text>
                    <Icon
                        type="material-community"
                        name="clock-outline"
                        color="#7a7a7a"
                        style={{ marginTop: 20, marginLeft: 5 }}
                    />
                </View>
                <View style={styles.separator}></View>
                <View>
                    <View style={styles.viewDates}>
                        <Text style={styles.textDates}>
                            Hora entrada
                        </Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateEntryTime}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={(e, selectedDate) => onChange(e, selectedDate, "entryTime")}
                        />
                    </View>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.viewDates}>
                    <Text style={styles.textDates}>
                        Hora Salida
                    </Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateExitTime}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={(e, selectedDate) => onChange(e, selectedDate, "exitTime")}
                    />
                </View>
                <View style={styles.separator}></View>
                <View style={styles.containerText}>
                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        title={message.generic.saveButton}
                        onPress={() => addTimeSchedule()}
                    />
                </View>
            </View>
        </ModalComponents>
    )
}

const styles = StyleSheet.create({
    card: {
        height: "43%",
        width: "90%",
        ...stylesCard
    },
    viewContainer: {
        flex: 1
    },
    containerText: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        marginTop: 20
    },
    separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#979797',
        alignSelf: 'center',
        marginVertical: 20
    },
    viewDates: {
        marginLeft: 10
    },
    textDates: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },
    button: {
        ...stylesButton,
    },
    buttonContainer: {
        ...stylesButtonContainer,
    },
})
