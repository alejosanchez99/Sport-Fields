import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, StyleSheet,View } from 'react-native'
import { useFocusEffect } from "@react-navigation/native"

import AccountOptions from '../../../feature/account/AccountOptions'
import InformationUser from '../../../feature/account/InformationUser'
import { getCurrentUser } from "../../../core/firebase/actions"

export default function UserLogged() {
  const [user, setUser] = useState(null)
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser());
    setReloadUser(false)
  }, [reloadUser]);

  return user && (
    <SafeAreaView>
      <ScrollView>
        <InformationUser user={user} />
        <View style={styles.accountOptions}>
          <AccountOptions user={user} setReloadUser={setReloadUser} />
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

