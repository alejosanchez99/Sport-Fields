import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon, Card, Avatar, Button, Rating } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../shared/styles/ColorsApp";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import {
  stylesButton,
  stylesButtonContainerAlert,
  stylesButtonSecundary,
} from "../../shared/styles/StylesButton";
import { message } from "../../assets/messages/message";
import ModalComponents from "../../shared/components/ModalComponents";
import { Calendar } from "react-native-calendars";
import { stylesCard } from "../../shared/styles/StylesCard";
import { getCollection } from "../../core/firebase/actions";
import { collectionsFirebase } from "../../core/firebase/collectionsFirebase";
import { isNull, map } from "lodash";

export default function DetailForm({ field }) {
  const {
    name,
    description,
    email,
    address,
    phone,
    rating,
    typeField,
    availablesDays,
    priceHour,
  } = field.item;
  const [
    showModalChooseScheduleTime,
    setShowModalChooseScheduleTime,
  ] = useState(false);

  const { daysSelected, entryTime, exitTime } = availablesDays[0];

  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState("jl");
  const [reservation, setReservation] = useState(null);
  const [favorites, setFavorites] = useState(false);

  const addFavorites = () => {
    const add = !favorites;
    if (add) {
      console.log("agregado");
    } else {
      console.log("eliminado");
    }
    setFavorites(add);
  };

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.iconContainer}>
        <Icon
          type="material-community"
          name="map-marker-outline"
          color={colors.four}
          onPress={() =>
            navigation.navigate("map-reservation", { fieldData: [field.item] })
          }
        />
      </View>
      <View
        style={{
          position: "absolute",
          height: 60,
          width: 60,
          backgroundColor: favorites ? colors.secundary : colors.yellow,
          top: -30,
          right: 90,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          type="material-community"
          name="star"
          size={30}
          color={colors.four}
          onPress={() => addFavorites()}
        />
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: colors.secundary,
            marginTop: 5,
          }}
        >
          {description}
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
              <Rating
                readonly
                startingValue={rating}
                ratingCount={5}
                value={2}
                imageSize={20}
              />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
              {rating}
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
            {typeField}
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
            {address}
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
          {phone}
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
          {email}
        </Text>
      </View>
      <Text style={styles.titleDates}>Horario de atención</Text>
      <Card containerStyle={styles.cardDates}>
        <ScrollView
          style={styles.containerCard}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {map(daysSelected, (dayOfWeek, index) => (
            <Avatar
              size="medium"
              key={index}
              rounded
              title={dayOfWeek.value}
              titleStyle={{ color: "#FFFFFF" }}
              containerStyle={{
                backgroundColor: dayOfWeek.isSelected
                  ? colors.three
                  : colors.primary,
                marginLeft: 6,
              }}
            />
          ))}
        </ScrollView>
      </Card>
      <View style={{ marginTop: 10, marginStart: 20 }}>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: colors.primary,
          }}
        >
          {entryTime + "-" + exitTime}
        </Text>
      </View>
      <Schedule
        isVisible={showModalChooseScheduleTime}
        setVisible={setShowModalChooseScheduleTime}
        setDateReservation={setReservation}
        dateTime={dateTime}
        setDateTime={setDateTime}
      />
      <TouchableOpacity
        style={styles.containerSchedule}
        onPress={() =>
          setShowModalChooseScheduleTime(!showModalChooseScheduleTime)
        }
      >
        <Icon type="material-community" name="clock-outline" color="#7a7a7a" />
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
            ${priceHour}
          </Text>
        </View>
      </View>

      {!isNull(user) ? (
        <View style={styles.viewContainer}>
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
            disabled={isNull(reservation)}
            title={message.reservation.reservationButton}
          />
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={message.login.login.buttonTitle}
            onPress={() => navigation.navigate("user-guest")}
          />
        </View>
      )}
    </View>
  );
}

function Schedule({
  isVisible,
  setVisible,
  dateTime,
  setDateTime,
  setDateReservation,
}) {
  const data = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(data);
  const [mode] = useState("time");

  const mark = {
    [date]: { selected: true, marked: true },
  };

  const saveDate = () => {
    setDateReservation(date);
    setVisible(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    const time = currentDate.getHours() + ":" + currentDate.getMinutes();
    setDateTime(currentDate);
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
            onDayPress={(day) => {
              setDate(day.dateString);
            }}
            markedDates={mark}
          />
        </Card>
        <Text style={styles.titleDates}>Hora de reserva</Text>
        <View>
          <View style={styles.viewDates}>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateTime}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={(e, selectedDate) => onChange(e, selectedDate)}
            />
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
            title={message.generic.cancel}
            onPress={() => setVisible(false)}
          />
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={message.generic.saveButton}
            onPress={() => saveDate()}
          />
        </View>
      </View>
    </ModalComponents>
  );
}

const getDefaultDateOfWeek = () => {
  return [
    {
      name: "lunes",
      value: "L",
      isSelected: false,
    },
    {
      name: "martes",
      value: "M",
      isSelected: false,
    },
    {
      name: "miercoles",
      value: "M",
      isSelected: false,
    },
    {
      name: "jueves",
      value: "J",
      isSelected: false,
    },
    {
      name: "viernes",
      value: "V",
      isSelected: false,
    },
    {
      name: "sabado",
      value: "S",
      isSelected: false,
    },
    {
      name: "domingo",
      value: "D",
      isSelected: false,
    },
  ];
};

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
    marginBottom: 10,
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
  iconContainerFavorite: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: colors.secundary,
    top: -30,
    right: 90,
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
  cardDates: {
    width: "90%",
    marginStart: 10,
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
    marginStart: 20,
  },
  viewDates: {
    marginTop: 10,
    marginStart: 20,
  },
  titleDates: {
    marginTop: 30,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  textDates: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  viewContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
