'use client'
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AvatarMenu() {
    const { user,logout } = useAuth();
    const router = useRouter();


    const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
        router.push('/login');
    };

    return (
        <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 w-80 bg-background border-none rounded-3xl mt-2" align="end">
                <div className="flex flex-col gap-3 px-4">
                    <h4 className="font-medium leading-none text-foreground">{user?.nama ?? "Nama Tidak Ditemukan"}</h4>
                    <p className="text-md text-muted-foreground">{user?.nrp ?? "NRP Tidak Ditemukan"}</p>
                    <p className="text-md text-muted-foreground">{user?.role ?? "Role tidak ditemukan"}</p>
                </div>
                <Button
                    variant={"danger-outline"}
                    size={"lg"}
                    className="cursor-pointer border-none hover:bg-input hover:text-destructive justify-start"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </PopoverContent>
        </Popover>
    )
}