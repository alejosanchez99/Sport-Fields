import { getPermissionLocation } from "./permissionApp"
import { Alert } from "react-native"
import * as Location from 'expo-location'

export const getCurrentLocation = async () => {
    const response = { status: false, location: null }
    const resultPermissions = await getPermissionLocation()
   
    if (resultPermissions.status === "denied") {
        Alert.alert("Debes dar permisos para la localización.")
    } else {
        const position = await Location.getCurrentPositionAsync({})
        
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
        
        response.status = true
        response.location = location
    }

    return response
}