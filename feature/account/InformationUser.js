import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Avatar } from "react-native-elements"

import colors from "../../shared/styles/ColorsApp"
import {  updateProfile, uploadImage } from "../../core/firebase/actions"
import { loadImageFromGallery } from "../../shared/utils/fileUtily"
import Modal from "../../shared/components/Modal"
import Loading from "../../shared/components/Loading"
import { message } from "../../assets/messages/message"

export default function InformationUser({ user }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [errorText, setErrorText] = useState(null);
  const [titleError, setTitleError] = useState(null);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1]);
    if (!result.status) {
      return;
    }
    setLoading(true);
    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      setTitleError(message.generic.titleError)
      setErrorText(message.login.changeData.errorSaveImage);
      showModal(true)
      return;
    }
    const resultUpdateProfile = await updateProfile({
      photoURL: resultUploadImage.url,
    });

    setLoading(false);

    if (resultUpdateProfile.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      setTitleError(message.generic.titleError)
      setErrorText(message.login.changeData.errorUploadImage);
      showModal(true)
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        onPress={changePhoto}
        containerStyle={styles.avatar}
        activeOpacity={0.7}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require("../../assets/icons/avatar-default.jpg")
        }
      >
        <Avatar.Accessory
          onPress={changePhoto}
          style={styles.avatarAccesory}
          icon={{ name: "home", type: "material-community" }}
        />
      </Avatar>
      <View style={styles.InfoUser}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text>{user.email}</Text>
      </View>
      <Modal
        isVisible={showModal}
        setVisible={setShowModal}
        title={titleError}
        text={errorText}
      />
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: colors.gray,
    paddingVertical: 15
  },
  InfoUser: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  avatarAccesory: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
});
