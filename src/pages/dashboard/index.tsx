import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import PrivateRoutes from "@/components/PrivateRoutes";
import LoginForm from "@/components/Forms/LoginForm";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { FaPlus, FaPhoneVolume } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import Img1 from "../../assets/images/avatar-user.jpeg";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import sendMessage from "@/helper/sendMessage";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/config";
import { DB_COLLECTION } from "@/constants/collections";
import userActions from "@/redux/user/actions";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state?.user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const userData = query(
  //     collection(db, DB_COLLECTION.USERS),
  //     where("mobile", "==", user?.mobile),
  //   );
  //   onSnapshot(userData, (snapshot) => {
  //     let data: any = [];
  //     snapshot.docs.forEach((item) => {
  //       data.push({ ...item.data(), id: item.id });
  //     });
  //     try {
  //       if (data?.length > 0 && expoPushToken !== data[0]?.expoPushToken) {
  //         dispatch({
  //           type: userActions.SET_EXPO_PUSH_TOKEN,
  //           payload: data[0]?.expoPushToken
  //         })
  //       }
  //     } catch (err) {
  //     }
  //   });
  // }, [])

  useEffect(() => {
    sendMessage({
      ...user,
    });
  }, []);

  return (
    <>
      <PrivateRoutes>
        <Layout>
          <div className="relative w-[100%] max-w-screen-lg h-[100%]">
            <div className="flex items-center">
              <div>
                <h2 className="text-primary font-semibold text-[25px]">
                  Miral Pandya
                </h2>
                <h3 className="text-black opacity-40 font-normal text-[15px]">
                  Awarded Best Astrologer 2020
                </h3>
              </div>
              <div className="ml-auto">
                <Image
                  alt="img"
                  src={Img1}
                  className="h-[50px] w-[50px] rounded-full"
                />
              </div>
              {/* <Avatar
                size={50}
                className="avatar ml-auto rounded-md"
                src={Img1.src}
              /> */}
              {/* <Avatar size={50} className="avatar ml-auto" src={Img1.src} /> */}
            </div>
            <div className="border-t border-gray-100 mt-4"></div>
            <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 mt-4 grid-cols-4 mx-auto font-medium gap-5 justify-center">
              <ServiceCard
                Icon={FaPlus}
                title={10000}
                subTitle="Clients"
                isCenterAlign={true}
              // onClick={() => router.push("/book")}
              />
              <ServiceCard
                Icon={FaPhoneVolume}
                isCenterAlign={true}
                title={17}
                subTitle="Years Experience"
              />
              <ServiceCard
                Icon={FaPhoneVolume}
                isCenterAlign={true}
                title={100000}
                subTitle="Success Horoscope"
              />
              <ServiceCard
                Icon={FaPhoneVolume}
                isCenterAlign={true}
                title={10}
                subTitle="Type of Horoscope"
              />
            </div>
            {/* <div
            className={classNames(
              "shadow-lg  h-[160px] w-full mx-auto my-auto",
              {
                "flex justify-center items-center flex-col": true,
              }
            )}
          >
            <div>
              <h1 className="mx-5 text-primary font-semibold text-[25px]">
                Gold Medalist Astrologer
              </h1>
            </div>
          </div> */}
            <div className="mt-10">
              <button
                className="p-3 px-5 bg-primary text-white rounded-md w-full disabled:bg-gray-300 font-semibold"
                onClick={() => router.push("/book")}
              >
                Book Appointment
              </button>
            </div>
            {/* <h3 className="text-primary mt-5 mb-5 text-[20px] font-semibold">
            Services
          </h3>
          <div
            className="grid max-sm:grid-cols-2 max-md:grid-cols-3 grid-cols-4 mx-auto font-medium gap-5 justify-center overflow-auto"
            style={{
              height: "calc(100% - 228px)",
              gridTemplateRows: "max-content",
            }}
          >
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
            <ServiceCard
              isImage={true}
              src={Img1}
              title=""
              subTitle="Kundli Dosh"
              isCenterAlign={true}
            />
          </div> */}
          </div>
        </Layout>
      </PrivateRoutes>
    </>
  );
}
