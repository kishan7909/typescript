import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/config";
import { DB_COLLECTION } from "../../constants/collections";
import moment from "moment";

export const saveAppointmentsService = async (appointments) => {
  return await addDoc(collection(db, DB_COLLECTION.APPOINTMENT), appointments);
};

export const getAppointmentsService = async () => {
  let data = [];
  try {
    const q = query(collection(db, DB_COLLECTION.APPOINTMENT));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    return err;
  }
};

export const getBookedAppointmentsService = async (date) => {
  let data = [];
  try {
    // const date = moment(new Date()).format("DD-MM-YYYY");
    const q = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("date", "==", date)
    );
    // const dataa = firebase.f
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({
        date: doc.data().date,
        time: doc.data().start_time,
        status: doc.data().status,
      });
    });

    return data;
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    return err;
  }
};

export const getUpcomingAppointmentsService = async (date, mobile) => {
  let data = [];
  try {
    var d = new Date(date);
    d.setDate(d.getDate() - 1);

    const q = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      // where("status", "not-in", ["canceled"]),
      where("mobile", "==", mobile),
      where("bookedDate", ">=", d)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }];
    });

    return data;
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    return err;
  }
};

export const getCompletedAppointmentsService = async (date, mobile) => {
  let data = [];
  try {
    const q = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("mobile", "==", mobile),
      where("bookedDate", "<", date),
      where("status", "==", "booked")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }];
    });

    return data;
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    return err;
  }
};

export const getCanceledAppointmentsService = async (mobile) => {
  try {
    let data = [];
    const q = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("status", "==", "canceled"),
      where("mobile", "==", mobile)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, { ...doc.data(), id: doc.id }];
    });

    return data;
  } catch (err) {
    console.info("----------------------------");
    console.info("err =>", err);
    console.info("----------------------------");
    return err;
  }
};

export const canceledAppointmentService = async (id) => {
  const q = await doc(db, DB_COLLECTION.APPOINTMENT, id);
  return await updateDoc(q, {
    status: "canceled",
  });
};

export const updateAppointmentService = async (appointment, id) => {
  delete appointment?.id;

  const q = await doc(db, DB_COLLECTION.APPOINTMENT, id);
  return await updateDoc(q, appointment);
};
