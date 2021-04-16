import React from 'react'
import { Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { size, map, filter } from "lodash"
import { Icon, Avatar } from "react-native-elements"
import { loadImageFromGallery } from "../../shared/utils/fileUtily"

export default function UploadImages({ imagesSelected, setImagesSelected }) {

    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <TouchableOpacity onPress={imageSelect}>
                        <Icon
                            type="material-community"
                            name="camera"
                            color="#7a7a7a"
                            containerStyle={styles.containerIcon}
                        />
                    </TouchableOpacity>

                )
            }
            {
                map(imagesSelected, (imageField, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageField }}
                        onPress={() => removeImage(imageField)}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3",
        borderRadius: 10
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }
})
