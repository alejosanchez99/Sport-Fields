import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'

import FieldOptions from '../../../feature/home/FieldOptions'
import SearchField from "../../../feature/home/SearchField";

export default function Home() {
    return (
        <SafeAreaView >
            <ScrollView>
                <SearchField />
                <FieldOptions />
            </ScrollView>
        </SafeAreaView >
    )
}


