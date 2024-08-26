"use client";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsMagic } from "react-icons/bs";
import { FaEnvelope, FaGift, FaHome } from "react-icons/fa";
import { LuNewspaper  } from "react-icons/lu";
import { PiSpeedometerFill } from "react-icons/pi";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm gap-x-2">
      <div className="flex gap-x-2">
        <Button className="button red"
          asChild
          variant={pathname === "/dashboard" ? "ghost" : "red"}
        >
          <Link href="/dashboard"><FaHome className="mr-2"/> Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/aboutus" ? "ghost" : "pink"}
        >
          <Link href="/client"><LuNewspaper className="mr-2"/> About Us</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/meter" ? "ghost" : "blue"}
        >
          <Link href="/server"><PiSpeedometerFill className="mr-2"/> Meter</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "ghost" : "darkblue"}
        >
          <Link href="/settings"><FaGift className="mr-2"/> Presents</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "ghost" : "green"}
        >
          <Link href="/settings"><FaEnvelope className="mr-2"/> Letters</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "ghost" : "yellow"}
        >
          <Link href="/settings"><BsMagic className="mr-2"/> Magic</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
