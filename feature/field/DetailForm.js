import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Card } from "react-native-elements";
import colors from "../../shared/styles/ColorsApp";
import {
  stylesButton,
  stylesButtonContainerAlert,
  stylesButtonSecundary,
} from "../../shared/styles/StylesButton";
import { Button } from "react-native-elements";
import { message } from "../../assets/messages/message";
import ModalComponents from "../../shared/components/ModalComponents";
import  { Calendar} from "react-native-calendars";
import { stylesCard } from "../../shared/styles/StylesCard";
import moment from "moment";

export default function DetailForm() {
  const [
    showModalChooseScheduleTime,
    setShowModalChooseScheduleTime,
  ] = useState(false);
  const [reservation, setReservation] = useState("")

  return (
    <View>
      <View style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="map-marker-outline"
          color={colors.four}
        />
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cancha</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: colors.secundary,
            marginTop: 5,
          }}
        >
          El Estadio Alberto J. Armando, popularmente conocido como La
          Bombonera, es un estadio de fútbol perteneciente al Club Atlético Boca
          Juniors, ubicado en el barrio de La Boca en la ciudad de Buenos Aires,
          Argentina
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={20} color={colors.primary} />
              <Icon name="star" size={20} color={colors.primary} />
              <Icon name="star" size={20} color={colors.primary} />
              <Icon name="star" size={20} color={colors.primary} />
              <Icon name="star" size={20} color={colors.gray} />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
              4.0
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 20,
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            Futbol
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Dirección:</Text>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: colors.secundary,
              marginLeft: 5,
            }}
          >
            Calle 10 # 20-14
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Telefono:</Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.secundary,
            marginLeft: 5,
          }}
        >
          3005812312
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Correo electronico:
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.secundary,
            marginLeft: 5,
          }}
        >
          prueba@hotmail.com
        </Text>
      </View>
      <Schedule
        isVisible={showModalChooseScheduleTime}
        setVisible={setShowModalChooseScheduleTime}
        setReservation={setReservation}
      />
      <TouchableOpacity
        style={styles.containerSchedule}
        onPress={() =>
          setShowModalChooseScheduleTime(!showModalChooseScheduleTime)
        }
      >
        <Icon
          type="material-community"
          name="clock-outline"
          color="#7a7a7a"      
        />
        <Text style={styles.textSchedule}>Seleccionar Fecha</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingLeft: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Precio:</Text>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#466A00",
              marginLeft: 10,
            }}
          >
            $120.000
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonSecundary}
          titleStyle={styles.textButton}
          type="outline"
          title={message.reservation.coments}
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          title={message.reservation.reservationButton}
        />
      </View>
    </View>
  );
}

function Schedule({ isVisible, setVisible, dateReservation }) {
  const data = moment().format("YYYY-MM-DD");  
  const [date, setDate] = useState(data)

  const mark = {
		[date]: {selected: true, marked: true}
	};

  return (
    <ModalComponents
      isVisible={isVisible}
      setVisible={setVisible}
      containerStyle={styles.card}
    >
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Fecha de la reserva:
        </Text>
        <Card>

          <Calendar
             minDate={data}
             onDayPress={day => {
              setDate(day.dateString)
            }}
            markedDates={mark}
  
           
          />
        </Card>
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonSecundary}
            titleStyle={styles.textButton}
            type="outline"
            title={message.generic.cancel}
            onPress={() => setVisible(false)}
          />
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={message.generic.saveButton}
          />
        </View>
      </View>
    </ModalComponents>
  );
}

const styles = StyleSheet.create({
  textButton: {
    color: colors.primary,
    textAlign: "center",
  },
  buttonSecundary: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    ...stylesButtonSecundary,
  },
  button: {
    ...stylesButton,
  },
  buttonContainer: {
    marginTop: 40,
    marginEnd: 10,
    ...stylesButtonContainerAlert,
  },
  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 10,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: colors.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  card: {
    width: "80%",
    padding: 20,
    alignSelf: "center",
    ...stylesCard,
  },
  textSchedule: {
    marginLeft: 5,
  },
  containerSchedule: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    width: "40%",
    backgroundColor: "#e3e3e3",
    borderRadius: 30,
    marginTop: 30,
    marginStart: 20
  },
});
