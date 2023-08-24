import { ReactElement } from "react";
import AppHeader from "./AppHeader";
import BottomNavigation from "./BottomNavigation";

interface PageProps {
  children: ReactElement;
  isPageTitle?: boolean;
  title?: string;
  isBackBtn?: boolean;
  backUrl?: string;
  isActionBtn?: boolean;
  actionTitle?: string;
  onActionClick?: () => {};
}

const Layout: React.FC<PageProps> = ({
  children,
  isPageTitle,
  title,
  isBackBtn,
  backUrl,
  isActionBtn,
  actionTitle,
  onActionClick,
}) => {
  return (
    <>
      <div className="h-full bg-[#f0f2f5]">
        <div className="flex h-[100vh] w-full justify-center relative flex-col">
          <div className="flex h-[100%] w-[100%] max-w-screen-lg flex-col  sm:border-2 overflow-hidde">
            <AppHeader
              isPageTitle={isPageTitle}
              title={title}
              isBackBtn={isBackBtn}
              backUrl={backUrl}
              isActionBtn={isActionBtn}
              actionTitle={actionTitle}
              onActionClick={onActionClick}
            />
            <div className="p-5" style={{ height: "calc(100% - 115px)" }}>
              {children}
            </div>
            <BottomNavigation />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
