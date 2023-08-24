import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/config"
import { DB_COLLECTION } from "../../constants/collections"


export const saveUserDetails = async (userdetails) => {
    return await addDoc(collection(db, DB_COLLECTION.USERS), userdetails)
}

export const getUserDetails = async (value,collumn) => {

    let data = null
    const q = query(collection(db, DB_COLLECTION.USERS), where(collumn, "==", value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data = doc.data()
        data.userId = doc.id
    });
    return data
}

export const updateUserService = async (data, id) => {

    const q = await doc(db, DB_COLLECTION.USERS, id);
    return await updateDoc(q, data);

}