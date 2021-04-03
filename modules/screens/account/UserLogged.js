import React from 'react'
import { View } from 'react-native'

import Header from "../../../shared/components/Header"
import AccountOptions from '../../../feature/account/AccountOptions'
import InformationUser from '../../../feature/account/InformationUser'
import styleView from "../../../shared/styles/StylesView"

export default function UserLogged() {
    return (
        <View>
            <InformationUser />
            <AccountOptions />
        </View>
    )
}
