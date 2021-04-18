import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Icon, Card, Button } from 'react-native-elements'
import { map, size } from "lodash"
import moment from 'moment'
import 'moment/locale/es'

import { stylesCard } from '../../../shared/styles/StylesCard'
import ChooseScheduleTime from "../../../feature/field/ChooseScheduleTime"
import colors from '../../../shared/styles/ColorsApp'
import { message } from '../../../assets/messages/message'
import { stylesButtonContainer, stylesButton } from "../../../shared/styles/StylesButton"

export default function AddFieldSchedule({ route, navigation }) {
    const { availablesDays } = route.params;
    const [showModalChooseScheduleTime, setShowModalChooseScheduleTime] = useState(false)
    const [informationSchedulesTime, setInformationSchedulesTime] = useState([...availablesDays])

    return (
        <View
            style={styles.viewBody}
        >
            {
                map(informationSchedulesTime, (informationScheduleTime, index) => (
                    <Card
                        containerStyle={styles.card}
                        key={index}
                    >
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            <Icon
                                type="material-community"
                                name="checkbox-blank-circle"
                                color="#A6AEAF"
                            />
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ marginLeft: 4, margin: 3, marginBottom: 5, fontWeight: "bold", fontSize: 20, flexWrap: 'wrap' }}>
                                        {
                                            map(informationScheduleTime.daysSelected, (daysSelected) => {
                                                return daysSelected.value
                                            }).join(", ")
                                        }
                                    </Text>
                                    <Text style={{ color: colors.primary, marginLeft: 2 }}>
                                        {moment(informationScheduleTime.createDate).locale('es').format('MMMM Do YYYY, h:mm:ss')}
                                    </Text>
                                </View>


                                <Text style={{ marginLeft: 4, color: "#A2A1A1", fontSize: 18 }}>
                                    {"fecha entrada:" + " " + informationScheduleTime.entryTime}
                                </Text>
                                <Text style={{ marginLeft: 4, color: "#A2A1A1", marginTop: 8, fontSize: 18 }}>
                                    {"fecha salida:" + " " + informationScheduleTime.exitTime}
                                </Text>
                            </View>
                        </View>
                    </Card>
                ))
            }
            {size(informationSchedulesTime) > 0 && (
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    title={message.generic.saveButton}
                    onPress={() => navigation.navigate("add-field", {
                        availablesDays: informationSchedulesTime
                    })}
                />
            )}

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
                setInformationSchedulesTime={setInformationSchedulesTime}
                informationSchedulesTime={informationSchedulesTime}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    button: {
        ...stylesButton,
    },
    buttonContainer: {
        marginTop: 50,
        ...stylesButtonContainer,
        marginBottom: 30
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
        marginTop: 30,
        alignItems: "center",
        ...stylesCard
    },
})
