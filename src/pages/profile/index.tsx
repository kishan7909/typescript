import OtpForm from "@/components/Forms/OtpForm";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import userActions from "@/redux/user/actions";
import authActions from "@/redux/auth/actions";
// import {firebase} from "firebase";
import firebase from "firebase/compat/app";
import sendMessage from "@/helper/sendMessage";

export default function Profile() {
  const router = useRouter();
  //@ts-ignore
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    sendMessage({
      isLogOut: true
    })
    await firebase.auth().signOut()
    dispatch({
      type: userActions.USER_CLEAR,
    });
    dispatch({
      type: authActions.AUTH_CLEAR,
    });
    router.push("/");
  };
  return (
    // <div className="h-full">
    //   <div className="flex h-[100vh] w-full justify-center">
    //     <div className="flex h-[100%] w-full max-w-lg flex-col border-primary sm:border-2 overflow-hidden bg-[#f0f2f5]">
    //       <PageHeader
    //         title="Profile"
    //         isBackBtn={true}
    //         backUrl="/dashboard"
    //         isActionBtn={true}
    //         actionTitle="Edit"
    //         onActionClick={() => router.push("/profile/edit")}
    //       />

    <Layout
      isPageTitle={true}
      title="Profile"
      isBackBtn={true}
      backUrl="/dashboard"
      isActionBtn={true}
      actionTitle="Edit"
      onActionClick={() => router.push(`/profile/edit?update=${true}`)}
    >
      <div className="bg-[#f0f2f5] py-5 h-full overflow-auto">
        <div className="sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-primary text-[20px]">
            Account Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <div className="divide-y divide-gray-200">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.user?.name}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                First name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.user?.firstName}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Last Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.user?.lastName}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.user?.email}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Mobile number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                +91-{user?.user?.mobile}
              </dd>
            </div>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                City
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user?.user?.city}
              </dd>
            </div>
            <div className="mt-10">
              <button
                className="p-3 px-5 bg-primary text-white rounded-md w-full disabled:bg-gray-300"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>

    //     </div>
    //   </div>
    // </div>
  );
}
