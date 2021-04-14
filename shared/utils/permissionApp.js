
import * as Permissions from 'expo-permissions'

export const getPermisionCamera = async () => {
    return await Permissions.askAsync(Permissions.CAMERA)
}

export const getPermissionLocation = async () => {
    return await Permissions.askAsync(Permissions.LOCATION)
}