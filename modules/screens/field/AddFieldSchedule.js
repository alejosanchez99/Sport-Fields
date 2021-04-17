import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Icon, Avatar, Card } from 'react-native-elements'
import { map } from "lodash"

import colors from '../../../shared/styles/ColorsApp'
import { stylesCard } from '../../../shared/styles/StylesCard'
import ChooseScheduleTime from "../../../feature/field/ChooseScheduleTime"

export default function AddFieldSchedule() {
    const [daysSelected, setDaysSelected] = useState([])
    const [daysOfWeek, setDaysOfWeek] = useState(getDateOfWeek())
    const [showModalChooseScheduleTime, setShowModalChooseScheduleTime] = useState(false)
    const [informationFieldSchedule, setInformationFieldSchedule] = useState({})

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

    return (
        <View style={styles.viewBody}>
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
            
            <Icon
                type="material-community"
                name="plus"
                color={colors.secundary}
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => setShowModalChooseScheduleTime(true)}
            />
            <ChooseScheduleTime
                setShowModal={setShowModalChooseScheduleTime}
                showModal={showModalChooseScheduleTime}
                setInformationFieldSchedule={setInformationFieldSchedule}
            />
        </View>
    )
}

const getDateOfWeek = () => {
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
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    container: {
        backgroundColor: colors.gray
    },
    card: {
        flexDirection: "row",
        margin: 20,
        alignItems: "center",
        ...stylesCard
    },
    containerCard: {
        flexDirection: "row",
        margin: 1
    }
})
