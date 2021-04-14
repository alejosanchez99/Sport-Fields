import React, { useCallback,useState } from 'react'
import { View } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"

import AccountOptions from '../../../feature/account/AccountOptions'
import InformationUser from '../../../feature/account/InformationUser'
import { getCurrentUser } from "../../../core/firebase/actions"

export default function UserLogged() {
    const [user, setUser] = useState(null)

    useFocusEffect(
        useCallback(() => {
          const userLogged = getCurrentUser()
          userLogged && (setUser(userLogged))
        }, [])
      );

    return user &&(
        <View>
            <InformationUser user={user}/>
            <AccountOptions user={user}/>
        </View>
    )
}
