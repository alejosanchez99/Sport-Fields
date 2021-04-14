import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'

import FieldOptions from '../../../feature/home/FieldOptions'
import SearchField from "../../../feature/home/SearchField"
import MapFields from "../../../feature/home/MapFields"

export default function Home() {
    return (
        <SafeAreaView >
            <ScrollView>
                <SearchField />
                <FieldOptions />
                <MapFields />
            </ScrollView>
        </SafeAreaView >
    )
}


