import { Menu } from "lucide-react";
import Image from "next/image";
import AvatarMenu from "./AvatarMenu";

interface NavbarProps {
    toggleSidebar: () => void;
    showMenuButton?: boolean;
}

export default function Navbar({ toggleSidebar, showMenuButton = true }: NavbarProps) {
    return (
        <div className="flex fixed top-0 left-0 p-4 px-8 z-50 w-full justify-between items-center bg-white border border-input">
            {showMenuButton && (
                <button onClick={toggleSidebar} className="p-2 bg-white rounded-lg cursor-pointer">
                    <Menu className="w-6 h-6" />
                </button>
            )}
            <Image
                alt="logo"
                src="https://myits-services.its.ac.id/assets/base/assets/img/logo-myits-blue.svg"
                width={80}
                height={40}
            />

            <AvatarMenu />
        </div>
    )
}