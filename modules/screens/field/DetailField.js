import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import colors from "../../../shared/styles/ColorsApp";
import DetailImages from "../../../feature/field/DetailImages";
import DetailForm from "../../../feature/field/DetailForm";

export default function DetailField({route}) {
  const{fields} = route.params
  const {images} = fields


  return (
    <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          <DetailImages images={images} />
          <DetailForm field={fields} />
          
        </ScrollView>
  
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: colors.four,
    },
    containerScroll: {
      backgroundColor: colors.four,
    }
  });
