import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import { db } from "../../config/config"
import { DB_COLLECTION } from "../../constants/collections"


export const saveTimeSlotService = async (timeSlot) => {
    return await addDoc(collection(db, DB_COLLECTION.TIME_SLOT), timeSlot)
}

export const getTimeSlotsService = async () => {
    let data = []
    const q = query(collection(db, DB_COLLECTION.TIME_SLOT));

    const querySnapshot = await getDocs(q);
    // data = querySnapshot
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    return data
}

export const get_TimeSlots_StartTime_ArrayService = async () => {
    let data = []
    const q = query(collection(db, DB_COLLECTION.TIME_SLOT));

    const querySnapshot = await getDocs(q);
    // data = querySnapshot
    querySnapshot.forEach((doc) => {
        data.push(doc.data().start_time);
    });
    return data
}