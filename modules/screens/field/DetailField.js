import React from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import colors from "../../../shared/styles/ColorsApp";
import DetailImages from "../../../feature/field/DetailImages";
import DetailForm from "../../../feature/field/DetailForm";

export default function DetailField() {
  return (
    <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerScroll}
    >
      <DetailImages />
      <DetailForm/>
     
    </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.four,
        paddingBottom: 20,
    },
    containerScroll: {
      backgroundColor: colors.four,
      paddingBottom: 20,
    }
  });
