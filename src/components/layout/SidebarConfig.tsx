import {
    Book,
    BookOpen,
    Calendar,
    Clipboard,
    FileSpreadsheet,
    Home,
    Shuffle,
} from "lucide-react";
import React from "react";

export interface SubMenuItem {
    label: string;
    href: string;
}

export interface SidebarItem {
    label: string;
    path?: string;
    icon: React.ReactNode;
    hasSubmenu: boolean;
    submenu?: SubMenuItem[];
}

export const SIDEBAR_GROUPS_MAHASISWA = [
    {
        groupLabel: "Beranda",
        items: [
            {
                label: "Beranda",
                path: "/",
                icon: <Home className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
    {
        groupLabel: "Berkas",
        items: [
            {
                label: "Logbook",
                path: "/logbook",
                icon: <Clipboard className="w-5 h-5" />,
                hasSubmenu: false,
            },
            {
                label: "Silabus",
                path: "/silabus",
                icon: <Book className="w-5 h-5" />,
                hasSubmenu: false,
            },
            {
                label: "Transkrip",
                path: "/transkrip",
                icon: <FileSpreadsheet className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
    {
        groupLabel: "MBKM",
        items: [
            {
                label: "MBKM",
                path: "/mbkm",
                icon: <BookOpen className="w-5 h-5" />,
                hasSubmenu: false,
            },
            {
                label: "Jadwal",
                path: "/jadwal",
                icon: <Calendar className="w-5 h-5" />,
                hasSubmenu: false,
            },
            {
                label: "Ekivalensi",
                path: "/ekivalensi",
                icon: <Shuffle className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
];
export const SIDEBAR_GROUPS_DOSEN = [
    {
        groupLabel: "Beranda",
        items: [
            {
                label: "Beranda",
                path: "/",
                icon: <Home className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
    {
        groupLabel: "MBKM",
        items: [
            {
                label: "Jadwal",
                path: "/jadwal",
                icon: <Calendar className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
];
export const SIDEBAR_GROUPS_MANAGEMENT = [
    {
        groupLabel: "Beranda",
        items: [
            {
                label: "Beranda",
                path: "/",
                icon: <Home className="w-5 h-5" />,
                hasSubmenu: false,
            },
        ],
    },
];
