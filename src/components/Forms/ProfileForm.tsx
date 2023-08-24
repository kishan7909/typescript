/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { ReactElement, useState, useEffect } from "react";
import LoginPoster from "../../assets/images/otp.png";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/redux/user/actions";
import { useForm } from "react-hook-form";
import { error } from "../Message";
import { storage } from "@/config/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface PageProps { }

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  city: "",
  region: "",
  zip: "",
  image: "",
};

const ProfileForm: React.FC<PageProps> = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const [isDisable, setIsDisable] = useState(false)
  const [image, setImage] = useState(null);
  const { update } = router?.query;
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //@ts-ignore
  const { auth, user } = useSelector((state) => state);

  useEffect(() => {
    const { update } = router?.query;
    //@ts-ignore
    if (update == true || update == "true") {
      const data = Object.assign({}, user?.user);
      delete data?.name;
      delete data?.id;
      setUserDetails(data);
      //@ts-ignore
      setImage(user?.user?.image);
    }
  }, [router?.query]);

  useEffect(() => {
    const { update } = router?.query;
    //@ts-ignore
    if (update == true || update == "true") {
      const data = Object.assign({}, user?.user);
      delete data?.name;
      delete data?.id;
      setUserDetails(data);
    } else {
      if (auth?.email) {
        setUserDetails({ ...userDetails, email: auth?.email });
      }
      else setUserDetails({ ...userDetails, mobile: auth?.mobile });
    }
  }, [router?.query]);

  const validation = () => {
    let validationError = false;
    if (userDetails?.firstName?.length <= 2) {
      validationError = true;
      error("Firstname is Require");
    } else if (userDetails?.lastName?.length <= 2) {
      validationError = true;
      error("Lastname is Require");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userDetails?.email)
    ) {
      validationError = true;
      error("Email is required");
    } else if (userDetails?.city?.length <= 2) {
      validationError = true;
      error("City is Require");
    }
    else if (userDetails?.mobile?.length !== 10) {
      validationError = true;
      error("Mobile is Require");
    }
    else if (userDetails?.zip?.length !== 6) {
      validationError = true;
      error("zip code is Require");
    }

    return validationError;
  };

  function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      //@ts-ignore
      let files = Array.from(input.files);
      //@ts-ignore
      setImage(URL.createObjectURL(files[0]));
      uploadFile(URL.createObjectURL(files[0]));
    };
    input.click();
  }
  const uploadFile = async (image: any) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, `files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    let link = null;
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        setIsDisable(true)
      },
      (error) => {
        alert(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL) => {
            setIsDisable(false)
            setUserDetails({ ...userDetails, image: downloadURL });
            //@ts-ignore
            setImage(downloadURL);
          }
        );
      }
    );
  };

  const onChangeHandler = (e: any) => {
    e.preventDefault();
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    let error = validation();
    if (!error) {
      dispatch({
        type: actions.UPDATE_USER,
        payload: {
          data: {
            ...userDetails,
          },
          id: user?.user?.userId,
          mobile: userDetails?.mobile,
          router,
        },
      });
    }
  };

  const handleSaveData = () => {
    if (router?.query?.update) {
      updateUser();
    } else {
      let error = validation();
      if (!error) {
        dispatch({
          type: actions.SAVE_USER,
          payload: {
            userDetails: {
              ...userDetails,
            },
            router,
          },
        });
      }
    }
  };

  return (
    <>
      <div className="bg-white px-10 py-5 rounded-tl-[30px] rounded-tr-[30px] mt-[-15px] h-full overflow-auto">
        <form onSubmit={handleSubmit(handleSaveData)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be not displayed with anyone.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {image ? (
                      <img
                        className="h-12 w-12 text-gray-300 rounded-full"
                        aria-hidden="true"
                        src={image}
                      />
                    ) : (
                      <FaUserCircle
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <button
                      type="button"
                      onClick={importData}
                      className="rounded-md bg-white border border-gray-900/10 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-primary">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      value={userDetails?.firstName}
                      onChange={onChangeHandler}
                      autoComplete="given-name"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      value={userDetails?.lastName}
                      onChange={onChangeHandler}
                      autoComplete="family-name"
                      className="block w-full rounded-md border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      disabled={auth?.email ? true : false}
                      value={userDetails?.email}
                      type="email"
                      onChange={onChangeHandler}
                      autoComplete="email"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div> */}

                <div className="col-span-full">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile
                  </label>
                  <div className="mt-2 flex items-center">
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium leading-6 mr-2 text-gray-900"
                    >
                      +91
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={userDetails?.mobile}
                      maxLength={10}
                      onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value.replace(/\D/g, "") })}
                      disabled={auth?.mobile === null ? false : true}
                      autoComplete="mobile"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      onChange={onChangeHandler}
                      value={userDetails?.city}
                      autoComplete="address-level2"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      onChange={onChangeHandler}
                      value={userDetails?.region}
                      autoComplete="address-level1"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="zip"
                      id="postal-code"
                      maxLength={6}
                      onChange={(e) => setUserDetails({ ...userDetails, zip: e.target?.value.replace(/\D/g, "") })}
                      value={userDetails?.zip}
                      autoComplete="postal-code"
                      className="block w-full rounded-md  border border-gray-900/10 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {update ? <button
              type="button"
              disabled={isDisable}
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button> : null}
            <button
              // onClick={() => handleSaveData()}
              disabled={isDisable}
              type="submit"
              className="rounded-md bg-primary w-[100px] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {router?.query?.update ? "Update" : " Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
