import { axiosInstance } from "./interceptor";

export const sendOtp = async ({ mobile }: any) => {
  try {
    const res = await axiosInstance.get(`/otp?mobile=${mobile}`);
    return res;
  } catch (error) {
    return error;
  }
};
export const confirmOtp = ({ mobile, otp }: any) => {
  return axiosInstance
    .get(`/confirmotp?mobile=${mobile}&otp=${otp}`)
    .then((res) => res);
};
export const resendOtp = ({ mobile }: any) => {
  return axiosInstance.get(`/resendotp?mobile=${mobile}`).then((res) => res);
};

export const cancelBookingMessage = (mobile: any, data: any) => {
  return axiosInstance
    .post(`/cancel?mobile=${mobile}`, data)
    .then((res) => res);
};
