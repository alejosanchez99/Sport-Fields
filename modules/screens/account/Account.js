import React from 'react'
import { StyleSheet, View } from 'react-native'
import AccountOptions from '../../../feature/account/AccountOptions'
import InformationUser from '../../../feature/account/InformationUser'

export default function Account() {
    return (
        <View>
            <InformationUser />
            <AccountOptions />
        </View>
    )
}

const styles = StyleSheet.create({})
