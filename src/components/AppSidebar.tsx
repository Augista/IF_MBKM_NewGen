import { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Navbar from "./Navbar";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import {
  SIDEBAR_GROUPS_DOSEN,
  SIDEBAR_GROUPS_MAHASISWA,
  SIDEBAR_GROUPS_MANAGEMENT
} from "./layout/SidebarConfig";
import SidebarGroup from "./layout/SidebarGroup";


export function AppSidebar() {
  const { user } = useAuth();
  const userRole = user?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const isMobile = useIsMobile()
  const router = useRouter();
  const pathname = usePathname();

  const selectedSidebarGroups = useMemo(() => {
    switch (userRole) {
      case "mahasiswa":
        return SIDEBAR_GROUPS_MAHASISWA;
      case "dosen":
        return SIDEBAR_GROUPS_DOSEN;
      case "management":
        return SIDEBAR_GROUPS_MANAGEMENT;
      default:
        return [];
    }
  }, [userRole]);

  const isActive = (basePath: string) => {
    if (basePath === "/") return pathname === "/";
    return pathname.startsWith(basePath);
  }

  const handleMenuClick = (href: string) => {
    router.push(href)
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu((prev) => (prev === label ? null : label));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile && <Navbar toggleSidebar={toggleSidebar} />}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 md:w-fit lg:w-64 bg-white border border-input flex flex-col z-40 transform transition-transform duration-300 
          ${isMobile ? `mt-16 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}` : ''
          }`
        }
      >
        <div className="flex w-full items-center justify-center py-4 pt-8 md:pt-16 px-4">
          <Image
            alt="logo"
            src="https://myits-services.its.ac.id/assets/base/assets/img/logo-myits-blue.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-24 h-12 md:w-16 md:h-8 lg:w-24 lg:h-12"
          />
        </div>

        <nav className="mt-4 flex flex-col gap-3 px-4">
          {selectedSidebarGroups.map((group, groupIdx) => (
            <SidebarGroup
              key={groupIdx}
              group={group}
              isActive={isActive}
              activeSubmenu={activeSubmenu}
              onMenuClick={handleMenuClick}
              onToggleSubmenu={toggleSubmenu}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
