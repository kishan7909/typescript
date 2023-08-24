import { ReactElement } from "react";

interface PageProps {
  children: ReactElement;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <div className="h-full bg-white px-8 py-4">{children}</div>
    </>
  );
};

export default Page;
