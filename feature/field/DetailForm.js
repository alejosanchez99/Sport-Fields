import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Icon, Avatar, Card } from "react-native-elements";
import colors from "../../shared/styles/ColorsApp";
import {
  stylesButton,
  stylesButtonContainerAlert,
  stylesButtonSecundary,
} from "../../shared/styles/StylesButton";
import { Button } from "react-native-elements";
import { message } from "../../assets/messages/message";
import ModalComponents from "../../shared/components/ModalComponents";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { stylesCard } from "../../shared/styles/StylesCard";

export default function DetailForm() {
  const [
    showModalChooseScheduleTime,
    setShowModalChooseScheduleTime,
  ] = useState(true);

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
      />
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
          title={message.reservation.titleButton}
        />
      </View>
    </View>
  );
}

function Schedule({ isVisible, setVisible }) {
  return (
    <ModalComponents
      isVisible={isVisible}
      setVisible={setVisible}
      containerStyle={styles.card}
    >
      <View
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Fecha de la reserva:
        </Text>
        <Card>
          <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              "2012-05-16": {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
              "2012-05-17": { marked: true },
              "2012-05-18": {
                marked: true,
                dotColor: "red",
                activeOpacity: 0,
              },
              "2012-05-19": { disabled: true, disableTouchEvent: true },
            }}
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
});
