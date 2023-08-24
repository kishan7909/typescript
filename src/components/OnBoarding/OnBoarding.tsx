import Image from "next/image";
import { ReactElement } from "react";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Img1 from "../../assets/images/kundli dosh1.png";
import Img2 from "../../assets/images/yagna.png";
import Img3 from "../../assets/images/rings.png";
import Img4 from "../../assets/images/timetable.png";
import Logo from "../../assets/images/JayveerText.png";
import { useRouter } from "next/router";

interface PageProps { }

const OnBoarding: React.FC<PageProps> = () => {
  const router = useRouter();
  const handleSkip = () => {
    router.push("/login")
  }
  const Skip = () => (<div onClick={handleSkip} className="absolute top-7 right-7">
    Skip {">>"}
  </div>)
  return (
    <>
      {/* <Skip /> */}
      <Swiper
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiper"

      >
        <SwiperSlide className="flex flex-col">
          <div
            className="h-full min-w-full bg-no-repeat bg-center bg-inherit"
            style={{ backgroundImage: `url(${Logo.src})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <div className="rounded-full h-[235px] w-[235px]  border-primary border-4 border-dashed flex items-center justify-center">
            <div className="rounded-full h-[200px] w-[200px] p-8 border-primary bg-white border-dashed flex items-center justify-center m-1">
              <Image src={Img1} alt="image" />
            </div>
          </div>
          <h3 className="text-primary mt-4 text-xl font-medium">
            Read Horoscopes
          </h3>
          <span className="text-white mx-10 mt-4">
            A description of what is going to happen to you, based on the
            position of the stars and planets at the time of your birth.
          </span>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <div className="rounded-full h-[235px] w-[235px]  border-primary border-4 border-dashed flex items-center justify-center">
            <div className="rounded-full h-[200px] w-[200px] p-8 border-primary bg-white border-dashed flex items-center justify-center m-1">
              <Image src={Img2} alt="image" />
            </div>
          </div>
          <h3 className="text-primary mt-4 text-xl font-medium">
            Pooja Based On Horoscope
          </h3>
          <span className="text-white mx-10 mt-4">
            Graha Shanti Puja is undertaken with the goal of reducing the
            negative effects of the planets that are malefic. It improves the
            positive energies of a person and the family performing this puja.
          </span>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">
          <div className="rounded-full h-[235px] w-[235px]  border-primary border-4 border-dashed flex items-center justify-center">
            <div className="rounded-full h-[200px] w-[200px] p-8 border-primary bg-white border-dashed flex items-center justify-center m-1">
              <Image src={Img3} alt="image" />
            </div>
          </div>
          <h3 className="text-primary mt-4 text-xl font-medium">
            Yog Based On Horoscope
          </h3>
          <span className="text-white mx-10 mt-4">
            In Hindu astrology, yog is the relationship between one planet,
            sign, or house to another by placement, aspect, or conjunction.
          </span>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col">

          <div className="rounded-full h-[235px] w-[235px]  border-primary border-4 border-dashed flex items-center justify-center">
            <div className="rounded-full h-[200px] w-[200px] p-8 border-primary bg-white border-dashed flex items-center justify-center m-1">
              <Image src={Img4} alt="image" />
            </div>
          </div>
          <h3 className="text-primary mt-4 text-xl font-medium">
            Easy Booking Appointment
          </h3>
          <span className="text-white mx-10 mt-4">
            To book an appointment with a jayveer astrology by checking
            availability, and confirm the appointment on a suitable date and
            time slot which are available
          </span>
          <button
            className="bg-white text-primary py-3 px-10 rounded min-w-[150px] absolute bottom-[100px]"
            onClick={() => router.push("/login")}
          >
            Next
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default OnBoarding;
