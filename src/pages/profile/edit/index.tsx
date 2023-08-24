import ProfileForm from "@/components/Forms/ProfileForm";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function EditProfile() {
  //@ts-ignore
  const { user } = useSelector((state) => state);
  const router = useRouter();

  return (
    //@ts-ignore
    <Loader loading={user?.isLoading}>
      <div className="h-full bg-white">
        <div className="flex h-[100vh] w-full justify-center">
          <div className="flex h-[100%] w-full max-w-lg:w-48 flex-col  sm:border-2 overflow-hidden">
            <PageHeader
              title="Edit Profile"
              isBackBtn={true}
              backUrl="/profile"
            />
            <ProfileForm />
          </div>
        </div>
      </div>
    </Loader>
  );
}
