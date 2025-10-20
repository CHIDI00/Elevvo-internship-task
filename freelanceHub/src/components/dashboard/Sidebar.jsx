import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, User, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/profile", label: "Profile", icon: User },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth duration-300 ${
              isActive
                ? "bg-purple-700 text-white font-medium hover:text-gray-50"
                : "text-gray-400 hover:bg-purple-100 hover:text-black dark:hover:bg-purple-300"
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen md:pt-0 pt-10
          lg:w-64 w-80 bg-white dark:bg-[#0b111f] border-r border-gray-200 dark:border-[#252525]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-700">FreelanceHub</h1>
            <p className="text-sm text-gray-300 mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <NavLinks />
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-black dark:text-white">
              Built with ❤ by CHiDI
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
