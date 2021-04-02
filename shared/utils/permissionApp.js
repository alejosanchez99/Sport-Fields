
import * as Permissions from 'expo-permissions'

export const GetPermisionCamera = async () => {
    return await Permissions.askAsync(Permissions.CAMERA)
}