import { useEffect } from "react";
import OtpForm from "@/components/Forms/OtpForm";
import actions from "@/redux/auth/actions";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../components/Loader";

export default function Otp() {
  const router = useRouter();
  const dispatch = useDispatch();
  //@ts-ignore
  const { auth, user } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  const goBack = () => {
    setLoading(true);
    dispatch({
      type: actions.SET_STATE,
      payload: {
        isOtpSendSuccess: false,
      },
    });
    router.back();
  };

  return (
    //@ts-ignore
    <Loader loading={loading || auth?.isLoading || user?.isLoading}>
      <div className="h-full bg-white">
        <div className="flex h-[100vh] w-full justify-center">
          <div className="flex h-[100%] w-full max-w-lg:w-48 flex-col  sm:border-2 overflow-hidden">
            <button
              className="text-secondary w-fit m-5 outline-none"
              onClick={() => router.push("/login")}
            >
              <BsArrowLeft
                onClick={goBack}
                size={"22px"}
                className="text-secondary"
              />
            </button>
            <OtpForm />
          </div>
        </div>
      </div>
    </Loader>
  );
}
