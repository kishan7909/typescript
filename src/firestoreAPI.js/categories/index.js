import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/config"
import { DB_COLLECTION } from "../../constants/collections"


export const saveCategoryService = async (category) => {
    return await addDoc(collection(db, DB_COLLECTION.CATEGORY), category)
}

export const getCategoriesService = async () => {
    let data = []
    const q = query(collection(db, DB_COLLECTION.CATEGORY), where("isdeleted", "==", false));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data = [...data, { ...doc.data(), id: doc.id }]
    });
    return data
}

// export const deleteCategoriesService = async (id) => {
//     let isDeleted = false
//     const q = await doc(db, DB_COLLECTION.CATEGORY, id);
//     await updateDoc(q, {
//         isdeleted: true,
//     }).then(() => {
//         isDeleted = true
//     }).catch((err) => isDeleted)

//     return await isDeleted
// }

export const deleteCategoriesService = async (id) => {
    let isDeleted = false
    const q = await doc(db, DB_COLLECTION.CATEGORY, id);
    await deleteDoc(q).then(() => {
        isDeleted = true
    }).catch((err) => isDeleted)

    return await isDeleted
}

export const updateCategoriesService = async (data) => {
    let isUpdate = false
    const q = await doc(db, DB_COLLECTION.CATEGORY, data.id);
    await updateDoc(q, data).then(() => {
        isUpdate = true
    }).catch((err) => isUpdate)

    return await isUpdate
}

