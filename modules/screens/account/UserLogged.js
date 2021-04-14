import React, { useCallback, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet,View } from 'react-native'
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

  return user && (
    <SafeAreaView>
      <ScrollView>
        <InformationUser user={user} />
        <View style={styles.accountOptions}>
          <AccountOptions user={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  accountOptions: {
    marginBottom: 30,
    marginTop: -10
  }
})

