import React, { useState, useCallback } from 'react'

import { useFocusEffect } from "@react-navigation/native"

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {

    const [login, setLogin] = useState(null)


    useFocusEffect(
        useCallback(() => {
            const user = false;//getCurrentUser()

            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    return login ? <UserLogged /> : <UserGuest />
}