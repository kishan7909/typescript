import { useRouter } from "next/router";
import { ReactElement } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";

interface PageProps {
  isBackBtn?: Boolean;
  backUrl?: string;
  title?: string;
  isActionBtn?: boolean;
  actionTitle?: string;
  onActionClick?: () => {};
}

const PageHeader: React.FC<PageProps> = ({
  isBackBtn,
  title,
  backUrl,
  isActionBtn,
  actionTitle,
  onActionClick,
}) => {
  const router = useRouter();
  //@ts-ignore
  const { user } = useSelector((state) => state.user);
  //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex items-center justify-center p-6 border-b pb-4 border-gray-100 sticky top-0 left-0 bg-secondary dark:bg-gray-900 shadow-md">
        {isBackBtn && user && token ? (
          <button
            className="text-white w-fit outline-none mr-auto absolute left-5 p-2"
            onClick={() => (backUrl ? router.push(backUrl) : null)}
          >
            <BsArrowLeft size={"22px"} className="text-white" />
          </button>
        ) : null}
        <h2 className="text-base font-semibold leading-7 text-[20px] text-white">
          {title ? title : "New Page"}
        </h2>
        {isActionBtn ? (
          <button
            className="text-white w-fit outline-none absolute right-5"
            onClick={onActionClick}
          >
            {actionTitle ? actionTitle : "Edit"}
          </button>
        ) : null}
      </div>
    </>
  );
};

export default PageHeader;
