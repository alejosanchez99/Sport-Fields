import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, Icon, Card, Avatar } from 'react-native-elements'
import ModalComponents from "../../shared/components/ModalComponents"
import DateTimePicker from '@react-native-community/datetimepicker'
import { map } from "lodash"

import { stylesCard } from '../../shared/styles/StylesCard'
import { message } from '../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from "../../shared/styles/StylesButton"
import colors from '../../shared/styles/ColorsApp'

export default function ChooseScheduleTime({ showModal, setShowModal, informationSchedulesTime, setInformationSchedulesTime }) {
    const [dateNow] = useState(new Date())
    const [dateEntryTime, setDateEntryTime] = useState(new Date())
    const [dateExitTime, setDateExitTime] = useState(new Date())
    const [mode] = useState('time')
    const [entryTime, setEntryTime] = useState(null)
    const [exitTime, setExitTime] = useState(null)
    const [daysSelected, setDaysSelected] = useState([])
    const [daysOfWeek, setDaysOfWeek] = useState(getDefaultDateOfWeek())

    const addDaySelected = (dayOfWeek, index) => {
        changePropertyIsSelected(index)
        setDaysSelected(daysSelected => [...daysSelected, dayOfWeek])
    }

    const changePropertyIsSelected = (indexDay) => {
        const daysOfWeekSelected = map(daysOfWeek, (dayOfWeek, index) => {
            if (indexDay == index) {
                dayOfWeek.isSelected = !dayOfWeek.isSelected
            }

            return { ...dayOfWeek }
        })

        setDaysOfWeek(daysOfWeekSelected)
    }

    const addTimeSchedule = () => {
        const scheduleTime = {
            createDate: dateNow.getDate() + "/" + dateNow.getMonth() + "/" + dateNow.getFullYear(),
            entryTime: entryTime,
            exitTime: exitTime,
            daysSelected: [
                ...daysSelected
            ]
        }

        setInformationSchedulesTime([...informationSchedulesTime, scheduleTime])
        setShowModal(false)
        setDaysOfWeek(getDefaultDateOfWeek())
        setDaysSelected([])
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
                <Card containerStyle={styles.card}>
                    <ScrollView
                        style={styles.containerCard}
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            map(daysOfWeek, (dayOfWeek, index) => (
                                <Avatar
                                    onPress={() => addDaySelected(dayOfWeek, index)}
                                    size="medium"
                                    key={index}
                                    rounded
                                    title={dayOfWeek.value}
                                    titleStyle={{ color: "#FFFFFF" }}
                                    containerStyle={{ backgroundColor: dayOfWeek.isSelected ? colors.three : colors.primary, marginLeft: 6 }}
                                />
                            ))
                        }
                    </ScrollView>
                </Card>
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
                        Hora salida
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

const getDefaultDateOfWeek = () => {
    return [
        {
            name: "lunes",
            value: "L",
            isSelected: false
        },
        {
            name: "martes",
            value: "M",
            isSelected: false
        },
        {
            name: "miercoles",
            value: "M",
            isSelected: false
        },
        {
            name: "jueves",
            value: "J",
            isSelected: false
        },
        {
            name: "viernes",
            value: "V",
            isSelected: false
        },
        {
            name: "sabado",
            value: "S",
            isSelected: false
        },
        {
            name: "domingo",
            value: "D",
            isSelected: false
        }
    ]
}

const styles = StyleSheet.create({
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
    card: {
        flexDirection: "row",
        margin: 20,
        marginTop: -5,
        alignItems: "center",
        ...stylesCard
    },
    containerCard: {
        flexDirection: "row",
        margin: 1
    }
})
