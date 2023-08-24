import PageHeader from "@/components/PageHeader";

import { ReactElement, useState, useEffect } from "react";
import DatePicker, {
  Calendar,
  utils,
} from "@hassanmojab/react-modern-calendar-datepicker";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import timeslotsAction from "../../redux/timeSlot/actions";
import appointmentsAction from "../../redux/appointments/actions";
import { getDay, getDate, getMonth, getYear, format } from "date-fns";
import moment from "moment";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

interface PageProps {
  children: ReactElement;
}

const Book: React.FC<PageProps> = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  //@ts-ignore
  const { timeslot, appointments, categories, user } = useSelector(
    (state) => state
  );
  //@ts-ignore
  const filteredTime = [];
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [start_time, setStart_time] = useState("");
  const [category, setCategory] = useState([]);
  const [allTimeslot, setAllTimeslot] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState([]);
  const [displayTime, setDisplayTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isDisable, setIsdisable] = useState(true);
  const [disableDates, setDisableDates] = useState([]);
  const [maximumDate, setMaximumDate] = useState();

  const compareTimeSlots = (timeSlotA: any, timeSlotB: any) => {
    // Extract the hours and minutes from the time slots
    const [hoursA, minutesA, meridiemA] = timeSlotA.split(/:|\s/);
    const [hoursB, minutesB, meridiemB] = timeSlotB.split(/:|\s/);

    // Convert hours to 24-hour format
    const convertedHoursA =
      meridiemA === "pm" && hoursA !== "12"
        ? parseInt(hoursA) + 12
        : parseInt(hoursA);
    const convertedHoursB =
      meridiemB === "pm" && hoursB !== "12"
        ? parseInt(hoursB) + 12
        : parseInt(hoursB);

    // Compare hours
    if (convertedHoursA < convertedHoursB) {
      return -1;
    } else if (convertedHoursA > convertedHoursB) {
      return 1;
    } else {
      // If hours are equal, compare minutes
      const minutesDiff = parseInt(minutesA) - parseInt(minutesB);
      return minutesDiff !== 0 ? minutesDiff : 0;
    }
  };

  useEffect(() => {
    if (appointments.isLoading || timeslot.isLoading || categories?.isLoading)
      setLoading(true);
    else setLoading(false);
  }, [appointments, timeslot, categories]);

  useEffect(() => {
    //@ts-ignore
    if (!start_time == "") {
      setIsdisable(false);
    }
  }, [start_time, tempDate]);

  useEffect(() => {
    let allAppointment: any = [];
    appointments?.bookedAppointments?.forEach((item: any) => {
      allAppointment.push(item.time);
    });
    setAppointmentTime(allAppointment);
    setAppointmentDate(appointments.bookedAppointments);
    setAllTimeslot(timeslot.startTime);
  }, [appointments, timeslot]);

  const getTimeSlots = () => {
    dispatch({
      type: timeslotsAction.GET_TIMESLOTS_START_TIME_ARRAY,
    });
  };

  const getAppointments = () => {
    dispatch({
      type: appointmentsAction.GET_BOOKED_APPOINTMENTS,
      payload: {
        date,
      },
    });
  };

  const getCategory = () => {
    // dispatch({
    //     type: categoryActions.GET_CATEGORIES
    // })
  };

  useEffect(() => {
    getAppointments();
  }, [date]);

  useEffect(() => {
    getTimeSlots();
    // getAppointments();
    getCategory();
    //@ts-ignore
    setTempDate(new Date());
    //@ts-ignore
    setDate(moment(new Date()).format("DD-MM-YYYY"));
    //@ts-ignore
    setSelectedDay(utils().getToday());
  }, []);

  useEffect(() => {
    if (router?.query?.id) {
      //@ts-ignore
      setStart_time(router?.query?.start_time);
      //@ts-ignore
      const [day, month, year] = router?.query?.date?.split("-");
      //@ts-ignore
      setTempDate(new Date(year, month - 1, day));

      const convertedDate = new Date(year, month - 1, day);
      const year1 = convertedDate.getFullYear();
      const month1 = String(convertedDate.getMonth() + 1).padStart(2);
      const day1 = String(convertedDate.getDate()).padStart(2);

      setSelectedDay({
        //@ts-ignore
        day: Number(day1),
        month: Number(month1),
        year: Number(year1),
      });
      setUpdate(true);
    }
  }, [router.query]);

  useEffect(() => {
    console.info("----------------------------");
    console.info("appointmentDate =>", appointmentDate);
    console.info("----------------------------");
    const selectDateTime = appointmentDate.filter((item: any) => {
      return item.date == date;
    });
    selectDateTime.map((data: any) => {
      if (data?.status === "pending" || data?.status === "booked") {
        filteredTime.push(data.time);
      }
    });

    const updatedTime = allTimeslot.filter(
      //@ts-ignore
      (item) => !filteredTime.includes(item)
    );

    const sortedTimeSlots = updatedTime.sort(compareTimeSlots);
    const newtimeslots = sortedTimeSlots.filter((ele: any) => {
      let hours = ele?.slice(0, 2);
      let minutes = ele?.slice(3, 5);
      let mederian = ele?.slice(6, 8);
      if (mederian == "pm" && Number(hours) !== 12) {
        hours = Number(hours) + 12;
      }
      let newDate = moment(new Date())
        .hours(hours)
        .minutes(minutes)
        .month(moment(tempDate).month())
        .date(moment(tempDate).date());
      return moment(new Date()) < newDate;
    });

    setDisplayTime(newtimeslots);
  }, [tempDate, appointmentDate]);

  function Submit() {
    const appointmentData = {
      name: user.user.name,
      email: user.user.email,
      mobile: user.user.mobile,
      reason: selected,
      date: date,
      start_time: start_time,
      isdeleted: false,
      status: "pending",
      bookedDate: tempDate,
      create_at: moment().toISOString(),
    };
    dispatch({
      type: appointmentsAction.SAVE_APPOINTMENTS,
      payload: { appointmentData, router },
    });
  }

  const updateAppointment = () => {
    const appointmentData = {
      // reason: selected,
      //@ts-ignore
      date: moment(new Date(tempDate)).format("DD-MM-YYYY"),
      start_time: start_time,
      bookedDate: tempDate,
      id: router?.query?.id,
    };
    dispatch({
      type: appointmentsAction.UPDATE_APPOINTMENT,
      payload: { appointmentData, router },
    });
  };

  function getSundaysInMonth(year: any, month: any) {
    const sundays = [];
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (getDay(date) === 0) {
        sundays.push({ day, month: month + 1, year });
      }
    }

    return sundays;
  }

  useEffect(() => {
    const today = new Date();
    const currentYear = getYear(today);
    const currentMonth = getMonth(today);
    const currentMontsundayslist = getSundaysInMonth(currentYear, currentMonth);
    const nextMotnhSundayList = getSundaysInMonth(
      currentYear,
      currentMonth + 1
    );
    const thirdMotnhSundayList = getSundaysInMonth(
      currentYear,
      currentMonth + 2
    );
    //@ts-ignore
    setDisableDates([
      ...nextMotnhSundayList,
      ...currentMontsundayslist,
      ...thirdMotnhSundayList,
    ]);
    const maxMonth = (currentMonth + 3) % 12;
    const maxYear = currentYear + Math.floor((currentMonth + 3) / 12);
    const daysInMaxMonth = new Date(maxYear, maxMonth, 0).getDate();
    const maxDate = { year: maxYear, month: maxMonth, day: daysInMaxMonth };
    //@ts-ignore
    setMaximumDate(maxDate);
  }, []);

  return (
    //@ts-ignore
    <Loader loading={loading}>
      <div className="h-full bg-white">
        <div className="flex h-[100vh] w-full justify-center">
          <div className="flex h-[100%] w-full max-w-lg:w-48 flex-col  sm:border-2 overflow-hidden">
            <PageHeader
              title="Book Appointment"
              isBackBtn={true}
              backUrl="/dashboard"
            />

            <div className="bg-white px-5 py-5 rounded-tl-[30px] rounded-tr-[30px] mt-[-15px] h-full overflow-auto">
              <div className="sm:px-0">
                <h3 className="text-base text-center font-normal leading-7 text-primary text-[16px]">
                  Select Prefered Date
                </h3>
              </div>
              <div className="mt-6">
                <Calendar
                  calendarClassName="custom-calendar"
                  //@ts-ignore
                  minimumDate={utils().getToday()}
                  value={selectedDay}
                  //@ts-ignore
                  maximumDate={maximumDate}
                  disabledDays={disableDates}
                  onChange={(e: any) => {
                    const convertedDate = new Date(e.year, e.month - 1, e.day);
                    //@ts-ignore
                    setTempDate(new Date(convertedDate));
                    setDate(
                      //@ts-ignore
                      moment(new Date(convertedDate)).format("DD-MM-YYYY")
                    );
                    setSelectedDay(e);
                  }}
                  shouldHighlightWeekends
                />
              </div>
              <div className="sm:px-0 mt-6">
                <h3 className="text-base text-center font-normal leading-7 text-primary text-[16px]">
                  Select Time Slot
                </h3>
              </div>
              <div className="mt-4">
                <ul className="flex list-none justify-center items-center flex-wrap p-0 m-0">
                  {displayTime &&
                    displayTime.map((ele) => (
                      <>
                        <li className="m-1">
                          <button
                            onClick={() => setStart_time(ele)}
                            className={classNames(
                              "rounded px-4 py-2 shadow-md text-[14px]",
                              {
                                "bg-primary text-white": ele == start_time,
                                "bg-white text-black": ele !== start_time,
                              }
                            )}
                          >
                            {ele}
                          </button>
                        </li>
                      </>
                    ))}
                </ul>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => (update ? updateAppointment() : Submit())}
                  disabled={isDisable}
                  className="p-3 px-5 bg-primary text-white rounded-md w-full disabled:bg-gray-300"
                >
                  {update ? "Update Appointment" : "Book Appointment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Book;
