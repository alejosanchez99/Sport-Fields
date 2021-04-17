import React from "react";
import { Alert, StyleSheet, ScrollView, TouchableOpacity,Image, View , Dimensions } from "react-native";
import { size, map, filter, round } from "lodash";
import { Icon, Avatar } from "react-native-elements";
import { loadImageFromGallery } from "../../shared/utils/fileUtily";
import { ImageBackground } from "react-native";

const widthScreen = Dimensions.get("window").width;

export default function DetailImages({ imagesSelected, setImagesSelected }) {


  return (
    <ScrollView horizontal style={styles.viewImages}>
      <ImageBackground
        style={styles.headerImage}
        source={require("../../assets/images/futbol.png")}
      />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewImages: {
    width: "100%",
    flexDirection: "row",
  },
  headerImage: {
    height: 200,  
    width: widthScreen,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
});
