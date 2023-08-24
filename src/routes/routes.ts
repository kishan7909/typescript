import react from "react";
import { GoHome } from "react-icons/go";
import { BsCalendar4Week } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

export const routes = [
  {
    name: "home",
    label: "Home",
    url: "/dashboard",
    icon: GoHome,
  },
  {
    name: "appointments",
    label: "Appointments",
    url: "/appointments",
    icon: BsCalendar4Week,
  },
  {
    name: "settings",
    label: "Settings",
    url: "/profile",
    icon: IoSettingsOutline,
  },
];
