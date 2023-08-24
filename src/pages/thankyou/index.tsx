import Layout from "@/components/Layout";
import Image from "next/image";
import DoneImg from "../../assets/images/done.png";
import { useRouter } from "next/router";

export default function Thankyou() {
  const router = useRouter();
  return (
    <Layout isPageTitle={true} title="Confirmation">
      <div className="h-full w-full flex items-center">
        <div className="relative">
          <Image alt="img" loading="eager" src={DoneImg} />
          <div className="absolute top-[203px] left-[43px] right-[68px] flex flex-col justify-center items-center">
            <h3 className="text-[21px] text-primary font-semibold text-center">
              Your Appointment has been confirmed
            </h3>
            <button
              className="bg-gray-400 mt-4 p-2 px-4 min-w-[100px] rounded-md text-white"
              onClick={() => router.push("/dashboard")}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
