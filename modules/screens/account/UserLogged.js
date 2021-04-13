import React, { useRef } from 'react'
import { View } from 'react-native'

import AccountOptions from '../../../feature/account/AccountOptions'
import InformationUser from '../../../feature/account/InformationUser'

export default function UserLogged() {

    const toastRef = useRef()

    return (
        <View>
            <InformationUser />
            <AccountOptions
                toastRef={toastRef}
            />
        </View>
    )
}
