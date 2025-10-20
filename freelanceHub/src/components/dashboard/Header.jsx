import {
  Moon,
  Sun,
  LogOut,
  Bell,
  FileText,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { recentActivities } from "../../data/statsData";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const recentNotifications = recentActivities.slice(0, 3);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDark((isDark) => !isDark);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "task":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case "project":
        return <Briefcase className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#0b111f] border-b border-gray-200 dark:border-[#252525] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="lg:hidden w-10" />
        <div className="hidden lg:block">
          <h2 className="text-xl text-black dark:text-white font-semibold">
            Dashboard
          </h2>
        </div>

        <div
          className="flex items-center gap-3 ml-auto relative"
          ref={dropdownRef}
        >
          {/* Notification button */}
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="relative text-black p-2 rounded-full hover:bg-purple-600 hover:text-white dark:text-white transition-all duration-300"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-green-400 rounded-full" />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute md:right-24 right-0 top-14 w-80 bg-white dark:bg-[#0b111f] shadow-lg rounded-xl border border-gray-200 dark:border-[#252525] transition-all duration-300 origin-top transform ${
              showDropdown
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            }`}
          >
            <div className="p-3 border-b dark:border-[#252525]">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
                Notifications
              </h3>
            </div>
            {recentNotifications.map((activity) => (
              <div
                key={activity.id}
                className={`flex flex-col justify-start gap-3 p-4 hover:bg-purple-50 dark:hover:bg-[#172039]`}
              >
                <div className="flex w-full items-start gap-3 dark:text-white">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-2 m-1 rounded-b-lg hover:bg-purple-400 hover:text-white text-center border-t dark:border-[#252525] text-xs text-purple-600 cursor-pointer">
              View all notifications
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-black p-2 rounded-full hover:bg-purple-600 hover:text-white dark:text-white  transition-all duration-300"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Logout */}
          <button className="text-black p-2 rounded-full hover:bg-purple-600 hover:text-white dark:text-white  transition-all duration-300">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
