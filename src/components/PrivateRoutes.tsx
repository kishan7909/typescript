import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import sendMessage from "./../helper/sendMessage";

interface PageProps {
  children: ReactElement;
}

const PrivateRoutes: React.FC<PageProps> = ({ children }) => {
  //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  //@ts-ignore
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    console.info("----------------------------");
    console.info("router =>", router);
    console.info("----------------------------");
    if (!token) {
      if (router.pathname !== "/privacypolicy") {
        router.push("/");
      }
    } else {
      if (!user) {
        router?.push("/profile/edit");
      }
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoutes;
