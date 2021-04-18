import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { size, map, filter, round } from "lodash";
import { Icon, Avatar } from "react-native-elements";
import { loadImageFromGallery } from "../../shared/utils/fileUtily";
import { ImageBackground } from "react-native";

const widthScreen = Dimensions.get("window").width;

export default function DetailImages({ images }) {
  return (
    <ScrollView horizontal style={styles.viewImages}>
      {map(images, (imageField, index) => (
        <ImageBackground
          key={index}
          source={{
            uri: imageField
          }}
          style={styles.headerImage}
        />
      ))}
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
