import { useEffect } from "react";
import Image from "next/image";
import { ReactElement, useState } from "react";
import LoginPoster from "../../assets/images/loginPoster.png";
import Google from "../../assets/images/google.png";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/redux/auth/actions";
import { error, warning } from "../Message";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import userActions from '@/redux/user/actions';
import firebase from 'firebase/app';
import 'firebase/auth';

const provider = new GoogleAuthProvider();

interface PageProps { }

const LoginForm: React.FC<PageProps> = () => {
  const router = useRouter();
  //@ts-ignore
  const { isOtpSendSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOtpSendSuccess) {
      router.push("/otp");
    }
  }, [isOtpSendSuccess]);

  const [number, setNuber] = useState("");
  const dispatch = useDispatch();

  const sendVerification = async () => {
    const mobile = number.slice(2);
    if (mobile.length === 10 && !isOtpSendSuccess) {
      dispatch({
        type: actions.SEND_OTP,
        payload: {
          mobile,
        },
      });
    } else {
      warning("Enter valid mobile number");
    }
  };



  // const loginWithGoogle =async () => {
  //   const auth = getAuth();
  //   // dispatch({
  //   //   type:actions.AUTH_LOADING,
  //   //   payload:true
  //   // })

  // await signInWithRedirect(auth,provider).then(async(result) => {
  //   console.info('----------------------------');
  //   console.info('result =>', result);
  //   console.info('----------------------------');
  //   // const token = await result.user.getIdToken()
  //   // const email = await result.user?.email
  //   // const emailVerified = await result.user?.emailVerified

  //   // if(token && email && emailVerified) {
  //   //   dispatch({
  //   //     type:actions.SET_STATE,
  //   //     payload:{
  //   //       isVerify:true,
  //   //       token,
  //   //       isLoading:false,
  //   //       email
  //   //     }
  //   //   })
  //   //     dispatch({
  //   //       type:userActions.GET_USER_DETAIL,
  //   //       payload:{
  //   //         email,
  //   //         router
  //   //       }
  //   //     })
  //   // } else {
  //   //   dispatch({
  //   //     type:actions.AUTH_LOADING,
  //   //     payload:false
  //   //   })
  //   // }

  // }).catch((err) => {
  //   console.info('----------------------------');
  //   console.info('err =>', err);
  //   console.info('----------------------------');
  //   dispatch({
  //     type:actions.AUTH_LOADING,
  //     payload:false
  //   })
  //   error("Something went wrong !")
  // })
  // }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${LoginPoster.src})` }}
        className="w-full h-[270px] bg-center bg-no-repeat bg-contain"
      />
      <div className="bg-white p-10 rounded-tl-[30px] rounded-tr-[30px] mt-[-15px] h-full">
        <header className="text-center">
          <h3 className="text-secondary text-[25px] font-bold">
            INDIA’S LEADING
          </h3>
          <h2 className="text-primary text-[35px] font-bold">ASTROLOGER</h2>
        </header>
        <div className="flex w-full justify-center items-center my-10">
          <div className="w-[80px] h-[1px] bg-secondary-600" />
          <h4 className="mx-5 text-secondary text-center">Login or Signup</h4>
          <div className="w-[80px] h-[1px] bg-secondary-600" />
        </div>
        <div>
          <PhoneInput
            containerClass="phone-input-container"
            inputClass="phone-input text-secondary"
            country={"in"}
            value={number}
            onChange={(e) => setNuber(e)}
          />
          <button
            className="bg-primary h-[49px] rounded w-full text-white mt-8"
            onClick={sendVerification}
          >
            Continue
          </button>
        </div>
        <div className="flex w-full justify-center items-center my-10">
          <div className="w-[80px] h-[1px] bg-secondary-600" />
          {/* <h4 className="mx-5 text-secondary">or Signup with</h4> */}
          <div className="w-[80px] h-[1px] bg-secondary-600" />
        </div>
        {/* <button onClick={loginWithGoogle} className="bg-white border-[#CACACA] border h-[49px] rounded w-full text-secondary mt-8 flex items-center justify-center">
          <Image src={Google} alt="google" className="h-[25px] w-[25px] mx-2" />{" "}
          Signup with Google
        </button> */}
        <footer className="mt-10 bottom-[10px] flex justify-center">
          <p className="text-[10px] text-secondary">
            By proceeding, you agree with our
            <br />{" "}
            <a href="#" className="underline">
              Terms of Service & Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default LoginForm;
