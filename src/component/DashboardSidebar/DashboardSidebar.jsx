import { NavLink, useLocation } from "react-router-dom";
import img from "../Image/OBJECTS.png";
import { Bot, Briefcase, Clock, FileText, Settings, Users } from "lucide-react";
import { MdRecentActors } from "react-icons/md";

const DashboardSidebar = () => {
  const location = useLocation();

  // Recent Contract active routes
  const isRecentContractActive =
    location.pathname === "/dashboard/recent_contract" ||
    location.pathname === "/dashboard/contract_proposal" ||
    location.pathname === "/dashboard/general_information";

  // Example: Subscription active routes (add your desired paths)
  const isSubscriptionActive =
    location.pathname === "/dashboard/subscription" ||
    location.pathname === "/dashboard/payment" || // Hypothetical related route
    location.pathname === "/dashboard/billing";  // Hypothetical related route

  // Example: All Application active routes (add your desired paths)
  const isAllApplicationActive =
    location.pathname === "/dashboard/all_application" ||
    location.pathname === "/dashboard/applicants" || // Hypothetical related route
    location.pathname === "/dashboard/review";      // Hypothetical related route

  return (
    <div className=" dark:bg-black dark:border-gray-600 text-black dark:text-white h-full">
      <NavLink to="/">
        <div>
          <img src={img} className="h-16 mt-7 pl-16 lg:mb-14" alt="Logo" />
        </div>
      </NavLink>
      <div className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 transition-colors duration-200 ${
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
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 transition-colors duration-200 ${
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
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 transition-colors duration-200 ${
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
            `flex items-center gap-3 mx-2 rounded-xl px-6 py-3 transition-colors duration-200 ${
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
            `flex items-center gap-3 px-6 py-3 mx-2 rounded-xl transition-colors duration-200 ${
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