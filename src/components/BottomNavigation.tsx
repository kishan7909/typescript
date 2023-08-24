import { routes } from "@/routes/routes";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface PageProps {}

const BottomNavigation: React.FC<PageProps> = ({}) => {
  const router = useRouter();
  const { t, i18n, ready } = useTranslation();
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-screen-lg w-screen h-16 bg-white border-t border-gray-200 shadow-md">
        <div className="grid h-full max-w-screen-lg w-screen grid-cols-3 mx-auto font-medium">
          {routes.map((item, k) => (
            <button
              key={k}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 outline-none"
              onClick={() => router.push(item.url)}
            >
              <item.icon
                fontSize={"20px"}
                className={
                  router.pathname === item.url
                    ? "text-primary"
                    : "text-secondary"
                }
              />
              <span
                className={classNames("text-[13px] mt-1", {
                  "text-secondary": item.url !== router.pathname,
                  "text-primary": item.url === router.pathname,
                })}
              >
                {t(item.name)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
