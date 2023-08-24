import LoginForm from "@/components/Forms/LoginForm";
import Loader from "./../../components/Loader";
import { useSelector } from "react-redux";

export default function Login() {
  //@ts-ignore
  const { auth } = useSelector((state) => state);
  return (
    //@ts-ignore
    <Loader loading={auth?.isLoading}>
      <div className="h-full bg-white">
        <div className="flex h-[100vh] w-full justify-center">
          <div className="flex h-[100%] w-full max-w-lg:w-48 flex-col  sm:border-2 overflow-hidden bg-secondary">
            <LoginForm />
          </div>
        </div>
      </div>
    </Loader>
  );
}
