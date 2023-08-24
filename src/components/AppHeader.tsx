/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect } from "react";
import Logo from "../assets/images/JayveerText.png";
import Image from "next/image";
import { Dropdown, MenuProps, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";
import { HiLanguage } from "react-icons/hi2";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

interface PageProps {
  isPageTitle?: boolean;
  isBackBtn?: boolean;
  title?: string;
  backUrl?: string;
  isActionBtn?: boolean;
  actionTitle?: string;
  onActionClick?: () => {};
}

const languages: any = {
  en: "English",
  hi: "हिंदी",
  gu: "ગુજરાતી",
};

const AppHeader: React.FC<PageProps> = ({
  isPageTitle,
  title,
  isBackBtn,
  backUrl,
  isActionBtn,
  actionTitle,
  onActionClick,
}) => {
  const { t, i18n, ready } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!i18n.language) {
      i18n.changeLanguage("en");
    }
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    console.info("----------------------------");
    console.info("lng =>", lng);
    console.info("----------------------------");
    i18n.changeLanguage(lng);
  };

  const items = [
    {
      label: (
        <a href="#" id="en">
          English
        </a>
      ),
      key: "en",
      onClick: () => changeLanguage("en"),
    },
    // {
    //   label: (
    //     <a href="#" id="hi">
    //       हिंदी
    //     </a>
    //   ),
    //   key: "hi",
    //   onClick: () => changeLanguage("hi"),
    // },
    // {
    //   label: (
    //     <a href="#" id="gu">
    //       ગુજરાતી
    //     </a>
    //   ),
    //   key: "gu",
    //   onClick: () => changeLanguage("gu"),
    // },
  ];
  return (
    <>
      <nav className="bg-secondary border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="w-full flex flex-wrap items-center justify-center mx-auto p-4">
          {isPageTitle ? (
            <>
              {isBackBtn ? (
                <button
                  className="text-white w-fit outline-none absolute left-5 p-2"
                  onClick={() => (backUrl ? router.push(backUrl) : null)}
                >
                  <BsArrowLeft size={"22px"} className="text-white" />
                </button>
              ) : null}
              {isActionBtn ? (
                <button
                  className="text-white w-fit outline-none absolute right-5 p-2"
                  onClick={onActionClick}
                >
                  {actionTitle}
                </button>
              ) : null}
            </>
          ) : (
            <a href="#" className="mr-auto">
              <Image
                src={Logo}
                loading="eager"
                className="rounded-full  h-[37px] w-fit max-w-[95px]"
                alt="Flowbite Logo"
              />
            </a>
          )}
          {isPageTitle && (
            <h2 className="text-base font-semibold leading-7 text-[20px] text-white">
              {title ? title : "New Page"}
            </h2>
          )}
          <div className="flex items-center md:order-2">
            {!isPageTitle && (
              <select
                value={`${i18n.language}`}
                className="bg-white p-1 px-2 rounded-md"
                onChange={(e) => {
                  changeLanguage(e.target.value);
                }}
              >
                {items.map((item, i) => (
                  <option
                    key={i}
                    className="p-2 broder border-b border-gray-100"
                    value={item.key}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;
