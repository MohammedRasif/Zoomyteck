
import { NavLink, useLocation } from "react-router-dom";
import img from "../Image/OBJECTS.png";
import { Bot, Briefcase, Clock, FileText, Settings, Users } from "lucide-react";
import { MdRecentActors } from "react-icons/md";
import img1 from "../Image/OBJECTS (2).png";
import { useDarkMood } from "../../context/ThemeContext";

const DashboardSidebar = () => {
  const location = useLocation();
  const { darkMode } = useDarkMood();

  // Recent Contract active routes
  const isRecentContractActive =
    location.pathname === "/dashboard/recent_contract" ||
    location.pathname.startsWith("/dashboard/contract_proposal/") ||
    location.pathname.startsWith("/dashboard/general_information/:noticeId");

  // Subscription active routes
  const isSubscriptionActive =
    location.pathname === "/dashboard/subscription" ||
    location.pathname === "/dashboard/payment" ||
    location.pathname === "/dashboard/billing";

  // All Application active routes
  const isAllApplicationActive =
    location.pathname === "/dashboard/all_application" ||
    location.pathname === "/dashboard/applicants" ||
    location.pathname === "/dashboard/review";

  return (
    <div className="dark:bg-black dark:border-gray-600 text-black dark:text-white h-full">
      <NavLink to="/">
        <div>
          <img
            src={darkMode ? img1 : img}
            className="h-16 mt-7 pl-16 lg:mb-14"
            alt="Logo"
          />
        </div>
      </NavLink>
      <div className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 ${
              isActive
                ? "bg-gray-300 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            }`
          }
        >
          <FileText className="h-6 w-6" />
          <h1 className="text-[16px] font-medium">Company Details</h1>
        </NavLink>

        <NavLink
          to="/dashboard/recent_contract"
          className={() =>
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 ${
              isRecentContractActive
                ? "bg-gray-300 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            }`
          }
        >
          <MdRecentActors className="h-6 w-6" />
          <h1 className="text-[16px] font-medium">Recent contract</h1>
        </NavLink>

        <NavLink
          to="/dashboard/subscription"
          className={() =>
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 ${
              isSubscriptionActive
                ? "bg-gray-300 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            }`
          }
        >
          <Briefcase className="h-6 w-6" />
          <h1 className="text-[16px] font-medium">Subscription</h1>
        </NavLink>

        <NavLink
          to="/dashboard/all_application"
          className={() =>
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 ${
              isAllApplicationActive
                ? "bg-gray-300 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            }`
          }
        >
          <Users className="h-6 w-6" />
          <h1 className="text-[16px] font-medium">All Application</h1>
        </NavLink>

        <NavLink
          to="/dashboard/setting"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 mx-2 rounded-xl ${
              isActive
                ? "bg-gray-300 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-200 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            }`
          }
        >
          <Settings className="h-6 w-6" />
          <h1 className="text-[16px] font-medium">Setting</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
