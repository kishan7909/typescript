import Image from "next/image";
import { ReactElement, useState, useEffect } from "react";
import LoginPoster from "../../assets/images/otp.png";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/redux/auth/actions";
import { warning } from "../Message";

interface PageProps { }

const OtpForm: React.FC<PageProps> = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  //@ts-ignore
  const { auth } = useSelector((state) => state);
  const [mobile, setMobile] = useState(auth?.mobile);
  const [seconds, setSeconds] = useState(59);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    //@ts-ignore
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      //@ts-ignore
      clearInterval(interval);
    }
    //@ts-ignore
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (seconds == 0) stopTimer();
  }, [seconds]);

  const startTimer = () => {
    setSeconds(59);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setSeconds(1);
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      dispatch({
        type: actions.CONFIRM_OTP,
        payload: {
          mobile,
          otp,
          router,
        },
      });
    } else {
      warning("Otp must be 6 digit!");
    }
  };

  const resendOtp = () => {
    if (seconds === 1) {
      dispatch({
        type: actions.RESEND_OTP,
        payload: {
          mobile,
          startTimer,
        },
      });
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${LoginPoster.src})` }}
        className="w-full h-[350px] bg-center bg-no-repeat bg-contain"
      />
      <div className="bg-white p-10 rounded-tl-[30px] rounded-tr-[30px] mt-[-15px] h-full">
        <header className="text-center">
          <h2 className="text-primary text-[35px] font-bold">
            OTP Verification
          </h2>
        </header>
        <div className="mt-10 mb-10 flex justify-center">
          <p className="w-[350px] text-center text-secondary">
            OTP Sent to{" "}
            <span className="font-bold text-primary">+91{mobile}</span> &
            registered mobile number
          </p>
        </div>
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{ display: "flex", justifyContent: "space-evenly" }}
            renderSeparator={""}
            renderInput={(props) => (
              <input
                {...props}
                type="number"
                style={{ width: "50px", outline: "none" }}
                className="text-secondary h-[50px] w-[100px]-!important py-[5px] px-[10px] border  text-center rounded border-primary m-1"
              />
            )}
          />
        </div>
        <div className="flex justify-center mt-10 flex-col items-center">
          <p className="text-secondary" onClick={resendOtp}>
            {seconds == 1 ? (
              <>Resend Otp</>
            ) : (
              <>
                Get OTP again in{" "}
                <span className="text-primary">{seconds} Seconds</span>
              </>
            )}
          </p>

          <button
            className="bg-primary h-[49px] rounded w-full text-white mt-10"
            onClick={() => handleVerify()}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
