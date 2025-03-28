import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { useAuth } from "./provider-auth";
import { LoadingOverlay } from "./component-loading";

const menuItems = [
  {
    path: "/dashboard",
    name: "Overview",
    icon: <></>,
  },
  {
    path: "/dashboard/cv-generator",
    name: "Resume Builder",
    icon: <></>,
  },
  {
    name: "Resume Analysis",
    path: "/dashboard/cv-analysis",
    icon: <></>,
  },
  {
    path: "/dashboard/job-recommendations",
    name: "Job Recommendations",
    icon: <></>,
  },

  {
    path: "/dashboard/career-chatbot",
    name: "Career Assistant",
    icon: <></>,
  },
];

export default function DashboardLayout({ children, location, navigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, logout, user } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  function handleChangePage(item) {
    navigate(item.path);
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return isLoading ? (
    <LoadingOverlay isLoading={isLoading} message={"Please wait, your application is being processed..."} />
  ) : (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Menu Toggle */}
      <div className="fixed left-4 top-4 z-50 block md:hidden">
        <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="flex flex-col gap-1.5">
            <div className={`h-0.5 w-5 bg-white transition-all ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}></div>
            <div className={`h-0.5 w-5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></div>
            <div className={`h-0.5 w-5 bg-white transition-all ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></div>
          </div>
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-gradient-to-b from-gray-900 to-black transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50"></div>
            <span className="text-2xl font-bold">JobPilot</span>
          </a>
        </div>
        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Main Menu</div>

          {menuItems.map((item) => (
            <a key={item.path} href="#" onClick={() => handleChangePage(item)} className={`group relative mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-md font-medium transition-all ${isActive(item.path) ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              {/* Active indicator */}
              {isActive(item.path) && <div layoutId="activeIndicator" className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />}

              {/* Icon with gradient when active */}
              <div className={`${isActive(item.path) ? "text-gradient-to-r from-cyan-400 to-violet-500" : "text-gray-400 group-hover:text-white"}`}>{item.icon}</div>

              <span>{item.name}</span>
            </a>
          ))}

          <div className="my-6 border-t border-white/10 pt-6">
            <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Account</div>

            <a
              href="#"
              onClick={() => {
                navigate("/dashboard/profile");
              }}
              className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
            >
              <span>Profile</span>
            </a>
          </div>
        </nav>
        {/* User Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            {isLoading ? (
              <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-700" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500">
                <span className="text-lg font-medium text-white">{getInitials(user?.fullName ?? "")}</span>
              </div>
            )}

            <div className="flex-1 overflow-hidden">
              {isLoading ? <div className="h-5 w-24 animate-pulse rounded bg-gray-700" /> : <h4 className="truncate font-medium">{user?.fullName ?? ""}</h4>}

              {isLoading ? <div className="mt-1 h-4 w-32 animate-pulse rounded bg-gray-700" /> : <p className="truncate text-sm text-gray-400">{user?.jobRoles[0] ?? ""}</p>}
            </div>

            {isLoading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700" />
            ) : (
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400 hover:bg-white/10 hover:text-white" asChild>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-72 pt-10">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-md md:h-20 md:px-6 container">
          <div className="ml-10 md:ml-0">
            <h1 className="text-xl font-bold md:text-2xl">{menuItems.find((item) => isActive(item.path))?.name || "Dashboard"}</h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-4 md:p-6 container">{children}</main>
      </div>
    </div>
  );
}
