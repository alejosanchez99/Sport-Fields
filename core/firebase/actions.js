import * as firebase from 'firebase'
import { firebaseApp } from './firebase'
import 'firebase/firestore'

import { fileToBlob } from '../../shared/utils/fileUtily'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false

    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })

    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }

    return result
}

export const loginUserWithEmailAndPassword = async (email, password) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }

    return result
}

export const uploadImage = async (image, path, name) => {
    const result = { statusResponse: true, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        result.url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const updateProfile = async (data) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const reauthenticate = async (password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}


export const updateEmail = async (email) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const updatePassword = async (password) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const addDocumentWithoutId = async (collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getCollection = async (collection) => {
    const result = { statusResponse: false, data: null, error: null }

    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        result.data = arrayData
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}

