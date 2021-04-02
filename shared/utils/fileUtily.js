import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

import { GetPermisionCamera } from "./permissionApp"

export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null }
    const resultPermissions = await GetPermisionCamera()

    if (resultPermissions.status === "denied") {
        Alert.alert("Debes de darle permiso para acceder a las imagenes del teléfono.")
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: array
        })

        if (!result.cancelled) {
            response.status = true
            response.image = result.uri
        }
    }

    return response
}

export const fileToBlob = async (path) => {
    const file = await fetch(path)
    const blob = await file.blob()

    return blob
}