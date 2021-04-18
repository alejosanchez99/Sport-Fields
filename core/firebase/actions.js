import * as firebase from 'firebase'
import { firebaseApp } from './firebase'
import { FireSQL } from 'firesql'
import 'firebase/firestore'

import { fileToBlob } from '../../shared/utils/fileUtily'
import { collectionsFirebase } from "../firebase/collectionsFirebase"

const db = firebase.firestore(firebaseApp)
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

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

export const getCollection = async (collectionName) => {
    const result = { statusResponse: false, data: null, error: null }

    try {
        const data = await db.collection(collectionName).get()
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        result.data = arrayData
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}

export const getFields = async (limitFields) => {
    const result = { statusResponse: true, error: null, fields: [], startField: null }

    try {
        const response = await db
            .collection(collectionsFirebase.fields)
            .orderBy("createAt", "desc")
            .limit(limitFields)
            .get()

        if (response.docs.length > 0) {
            result.startField = response.docs[response.docs.length - 1]
        }

        response.forEach((doc) => {
            const field = doc.data()
            field.id = doc.id
            result.fields.push(field)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}

export const getMoreFields = async (limitFields, startField) => {
    const result = { statusResponse: true, error: null, fields: [], startField: null }
    try {
        const response = await db
            .collection(collectionsFirebase.fields)
            .orderBy("createAt", "desc")
            .startAfter(startField.data().createAt)
            .limit(limitFields)
            .get()

        if (response.docs.length > 0) {
            result.startField = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const field = doc.data()
            field.id = doc.id
            result.fields.push(field)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const searchFields = async (criteria) => {
    const result = { statusResponse: true, error: null, fields: [] }
    try {
        result.fields = await fireSQL.query(`SELECT * FROM fields WHERE name LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getIsFavorite = async (idField) => {
    const result = { statusResponse: true, error: null, isFavorite: false }
    try {
        const response = await db
            .collection(collectionsFirebase.favorites)
            .where("idField", "==", idField)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const deleteFavorite = async (idField) => {
    const result = { statusResponse: true, error: null }
    try {
        const response = await db
            .collection(collectionsFirebase.favorites)
            .where("idField", "==", idField)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        response.forEach(async (doc) => {
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

export const getFavorites = async () => {
    const result = { statusResponse: true, error: null, favorites: [] }
    try {
        const response = await db
            .collection(collectionsFirebase.favorites)
            .where("idUser", "==", getCurrentUser().uid)
            .get()

        await Promise.all(
            map(response.docs, async (doc) => {
                const favorite = doc.data()
                const field = await getDocumentById(collectionsFirebase.fields, favorite.idField)
                if (field.statusResponse) {
                    result.favorites.push(field.document)
                }
            })
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}