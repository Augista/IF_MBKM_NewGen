import Link from "next/link";
import SidebarLink from "../SidebarLink";
import Typography from "../Typography";
import { SidebarItem } from "./SidebarConfig";

interface SidebarGroupProps {
    group: {
        groupLabel: string;
        items: SidebarItem[];
    };
    isActive: (path: string) => boolean;
    activeSubmenu: string | null;
    onMenuClick: (href: string) => void;
    onToggleSubmenu: (label: string) => void;
}

export default function SidebarGroup({
    group,
    isActive,
    activeSubmenu,
    onMenuClick,
    onToggleSubmenu,
}: SidebarGroupProps) {
    return (
        <div className="mb-4 flex flex-col gap-2">
            <Typography
                id="menu"
                variant="l2"
                weight="medium"
                className="flex pl-4 md:pl-0 lg:pl-4 text-[12px] justify-start md:justify-center lg:justify-start text-muted-foreground"
            >
                {group.groupLabel}
            </Typography>

            <div className="flex flex-col gap-2">
                {group.items.map((item, idx) => (
                    <div key={idx}>
                        <SidebarLink
                            href={item.path ?? "#"}
                            label={item.label}
                            icon={item.icon}
                            isActive={!item.hasSubmenu && isActive(item.path || "")}
                            hasSubmenu={item.hasSubmenu}
                            isSubmenuOpen={activeSubmenu === item.label}
                            onClick={() =>
                                item.hasSubmenu
                                    ? onToggleSubmenu(item.label)
                                    : item.path && onMenuClick(item.path)
                            }
                        />

                        {item.hasSubmenu && activeSubmenu === item.label && item.submenu && (
                            <div className="ml-6 space-y-1">
                                {item.submenu.map((sub, subIdx) => (
                                    <Link
                                        key={subIdx}
                                        href={sub.href}
                                        onClick={() => onMenuClick(sub.href)}
                                        className={`flex w-full text-left font-medium py-3 px-4 rounded-lg hover:text-sidebar text-sm cursor-pointer ${isActive(sub.href)
                                            ? "bg-sidebar-accent text-sidebar"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
