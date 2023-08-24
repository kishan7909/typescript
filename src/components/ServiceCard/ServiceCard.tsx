/* eslint-disable react/jsx-no-comment-textnodes */
import classNames from "classnames";
import Image from "next/image";
import { ReactElement } from "react";
import { FaPlus } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import CountUp from "react-countup";

interface PageProps {
  Icon?: any;
  isImage?: boolean;
  src?: any;
  title?: number;
  subTitle?: string;
  onClick?: () => {};
  isCenterAlign?: boolean;
}

const ServiceCard: React.FC<PageProps> = ({
  Icon,
  isImage,
  src = "",
  title,
  subTitle,
  isCenterAlign,
  onClick,
}) => {
  return (
    <>
      <div
        className={classNames(
          "shadow-lg  h-[160px] w-[100%] max-w-[180px] mx-auto my-auto bg-white rounded-lg",
          {
            "flex justify-center items-center flex-col": isCenterAlign,
          }
        )}
        onClick={onClick}
      >
        {/* {isImage ? (
          <Image
            alt="img"
            src={src}
            className="h-[80px] w-[80px] rounded-full mx-5 mt-3"
          />
        ) : (
          <div className="h-[80px] w-[80px] rounded-full bg-primary text-white flex justify-center items-center mx-5 mt-3">
            <Icon
              className="text-white font-bold"
              color="#fff"
              style={{ fontWeight: "bolder" }}
              size={"40px"}
            />
          </div>
        )} */}
        <div>
          <h1 className="mx-5 text-primary font-semibold text-[30px]">
            {/* @ts-ignore */}
            <CountUp end={title} />+
          </h1>
        </div>
        <div className="mx-5 mt-2">
          <h4 className="text-secondary font-semibold text-center">
            {subTitle}
          </h4>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
