import OnBoarding from "@/components/OnBoarding/OnBoarding";
import Page from "@/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function Home() {
  //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  //@ts-ignore
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, perform any necessary actions
        console.log(user);
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (token) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/profile/edit");
      }
    }
  }, []);

  return (
    <div className="h-full bg-white">
      <div className="flex h-[100vh] w-full justify-center">
        <div className="flex h-[100%] w-full max-w-lg:w-48 flex-col sm:border-2 overflow-hidden">
          <OnBoarding />
        </div>
      </div>
    </div>
  );
}
