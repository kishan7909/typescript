import React from "react";
import Empty from "../assets/images/empty.jpg";
import Image from "next/image";

const EmptyScreen = () => {
  return (
    <div className="h-full w-full flex items-center">
      <div className="relative">
        <div className="flex flex-col justify-center items-center mb-8">
          <h3 className="text-[15px] text-secondary font-semibold text-center">
            No Booking Records Founds
          </h3>
        </div>
        <Image alt="img" loading="eager" src={Empty} />
      </div>
    </div>
  );
};

export default EmptyScreen;

// const styles = StyleSheet.create({
//     container: {
//         // position: "absolute",
//         height: height / 1.56,
//         // width,
//         justifyContent: "center",
//         // backgroundColor: "red",
//         alignItems: "center"
//     }
// })
