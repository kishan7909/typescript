/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Layout from "@/components/Layout";
import { Radio } from "antd";
import { BsCalendar3, BsClock } from "react-icons/bs";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { DB_COLLECTION } from "./../../constants/collections";
import { db } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/router";
import classNames from "classnames";
import actions from "@/redux/appointments/actions";
import EmptyScreen from "@/components/EmptyScreen";
import { ExclamationCircleFilled } from '@ant-design/icons';
// import { Button, Modal, Space } from 'antd';
import Modal from './../../components/Modal';
import ConfirmationModal from "./../../components/Modal";

// const { confirm } = Modal;

export default function Appointments() {
  const dispatch = useDispatch();
  const router = useRouter();
  //@ts-ignore
  const { appointments, auth } = useSelector((state) => state);
  const [tab, setTab] = React.useState<any>("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [canceledRow, setCanceledRow] = useState([]);
  const [isConfirmation, setIsConfirmation] = useState(false)

  useEffect(() => {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    const q = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("mobile", "==", auth?.mobile),
      where("bookedDate", ">=", d)
    );
    onSnapshot(q, (snapshot) => {
      let data: any = [];
      snapshot.docs.forEach((item) => {
        data.push({ ...item.data(), id: item.id });
      });
      const tempdata = data.filter((item: any) => {
        return item?.status !== "canceled";
      });
      setUpcoming(tempdata);
    });

    var date = new Date();
    const completed = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("mobile", "==", auth?.mobile),
      where("bookedDate", "<", date),
      where("status", "==", "booked")
    );
    onSnapshot(completed, (snapshot) => {
      let data: any = [];
      snapshot.docs.forEach((item) => {
        data.push({ ...item.data(), id: item.id });
      });
      setCompleted(data);
    });
    const canceled = query(
      collection(db, DB_COLLECTION.APPOINTMENT),
      where("status", "==", "canceled"),
      where("mobile", "==", auth?.mobile)
    );
    onSnapshot(canceled, (snapshot) => {
      let data: any = [];
      snapshot.docs.forEach((item) => {
        data.push({ ...item.data(), id: item.id });
      });
      setCanceled(data);
    });
  }, []);

  const hanldeCanceleAppoinment = () => {
    dispatch({
      type: actions.CANCELED_APPOINTMENT,
      payload: canceledRow,
    });
    setIsConfirmation(false)
    setCanceledRow([])
    // confirm({
    //   centered: true,
    //   title: 'Are you want to cancel this appointment?',
    //   icon: <ExclamationCircleFilled />,
    //   // content: 'Some descriptions',
    //   okText: 'Yes',
    //   okType: 'danger',
    //   cancelText: 'No',
    //   onOk() {
    //     dispatch({
    //       type: actions.CANCELED_APPOINTMENT,
    //       payload: item,
    //     });
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });

  };

  const hanldeUpdateAppoinment = (item: any) => {
    router.push(
      `/book?id=${item.id}&date=${item.date}&start_time=${item.start_time}`
    );
  };

  return (
    //@ts-ignore
    <Layout isPageTitle={true} title="Appointments">
      <ConfirmationModal
        message="Are you want to cancel this appointment?"
        onYesClick={() => hanldeCanceleAppoinment()}
        onNoClick={() => setCanceledRow([])}
        setIsopen={setIsConfirmation}
        isOpen={isConfirmation}
      />

      <div className="flex justify-center">
        <div className="btn-tab-list shadow-md">
          <button
            onClick={() => setTab("upcoming")}
            className={classNames("btn-tab", { active: tab === "upcoming" })}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab("completed")}
            className={classNames("btn-tab", { active: tab === "completed" })}
          >
            Completed
          </button>
          <button
            onClick={() => setTab("canceled")}
            className={classNames("btn-tab", { active: tab === "canceled" })}
          >
            Canceled
          </button>
        </div>
      </div>
      <div
        className="mt-4 overflow-auto"
        style={{ height: "calc(100% - 56px)" }}
      >
        {tab == "upcoming" && (
          <>
            {upcoming?.map(
              (item: any) =>
                item?.status !== "canceled" && (
                  <AppointmentCard
                    tab={tab}
                    hanldeCanceleAppoinment={(itemData: any) => {
                      setIsConfirmation(true)
                      setCanceledRow(itemData)
                    }}
                    item={item}
                    hanldeUpdateAppoinment={hanldeUpdateAppoinment}
                  />
                )
            )}
          </>
        )}
        {tab == "completed" && (
          <>
            {completed?.map((item) => (
              <AppointmentCard
                tab={tab}
                hanldeCanceleAppoinment={hanldeCanceleAppoinment}
                item={item}
              />
            ))}
          </>
        )}
        {tab == "canceled" &&
          canceled?.map((item) => (
            <AppointmentCard
              tab={tab}
              hanldeCanceleAppoinment={hanldeCanceleAppoinment}
              item={item}
            />
          ))}

        {canceled?.length == 0 && tab == "canceled" && <EmptyScreen />}
        {completed?.length == 0 && tab == "completed" && <EmptyScreen />}
        {upcoming?.length == 0 && tab == "upcoming" && <EmptyScreen />}
      </div>
    </Layout>
  );
}

const AppointmentCard = ({
  tab,
  hanldeCanceleAppoinment = () => { },
  item,
  hanldeUpdateAppoinment = () => { },
}: any) => {
  const [color, setColor] = useState();

  useEffect(() => {
    //@ts-ignore
    if (item?.status == "booked") setColor("#2A9C2F");
    //@ts-ignore
    else if (item?.status == "pending") setColor("#FFD95A");
    //@ts-ignore
    else if (tab === "canceled") setColor("red");
  }, [tab]);

  return (
    <div className="shadow-md flex flex-col bg-white p-4 rounded-lg mb-4">
      {/* <header className="border-b border-gray-100 pb-4 justify-between flex">
        <h3 className="text-secondary font-semibold">Janam Kundli</h3>
        <MdModeEditOutline onClick = {() => hanldeUpdateAppoinment(item)} size={18} className="text-secondary font-semibold mr-5 cursor-pointer" />
      </header> */}
      <div className="pt-3 border-b border-gray-100 pb-4">
        <div>
          <ul className="flex m-0 items-center justify-between">
            <li className="flex items-center">
              <BsCalendar3 className="mr-1 text-secondary" />
              <span className="text-[13px] text-secondary">{item?.date} </span>
            </li>
            <li className="flex items-center">
              <BsClock className="mr-1 text-secondary" />
              <span className="text-[13px] text-secondary">
                {item?.start_time}
              </span>
            </li>
            <li className="flex items-center">
              <div
                className={`btn-status mr-1 `}
                style={{
                  backgroundColor: color,
                }}
              ></div>
              <span className="text-[13px] text-secondary">
                {item?.status == "booked" ? "Confirmed" : item?.status}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3 flex justify-end items-center flex-wrap">
        <div className="text-secondary mr-auto mb-2">
          <p>
            Ref No: <br /> {item?.id}
          </p>
        </div>
        {tab === "upcoming" && (
          <div className="flex">
            <button
              onClick={() => hanldeUpdateAppoinment(item)}
              className="bg-secondary text-white p-2 px-5 rounded-md min-w-[100px] mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => {
                hanldeCanceleAppoinment(item);
              }}
              className="bg-gray-300 text-secondary p-2 px-5 rounded-md min-w-[100px]"
            >
              Cancel
            </button>

          </div>
        )}
      </div>
      {/* <ConfirmationPrompt /> */}
    </div>
  );
};
