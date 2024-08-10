"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { cn } from "@/lib/utils";

export default function Navbar(): JSX.Element {
  return (
    <nav className="w-full max-w-[1350px] mx-auto flex justify-between items-center px-4 lg:px-6 py-4 lg:py-4">
      <Link href="/">
        <Image
          src="/images/EasyFarm.png"
          alt="logo"
          width={120}
          height={100}
          className="lg:w-24 w-16"
        />
      </Link>
      <ResponsiveMenu />
    </nav>
  );
}

function ResponsiveMenu(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul className="lg:flex justify-center gap-5 items-center text-base hidden tracking-tighter">
        <NavLink href="/">Profile</NavLink>
        <NavLink href="/create">New round</NavLink>
        <NavLink href="/rounds">Rounds</NavLink>
      </ul>
      <div className="lg:flex gap-3 hidden items-center font-semibold tracking-tight">
        <ConnectButton showBalance={false} />
      </div>
      <ResponsiveSidebar open={open} setOpen={setOpen} />
      <BarsButton className="lg:hidden block" open={open} setOpen={setOpen} />
    </>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}): JSX.Element {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "transition-colors",
          isActive
            ? "lg:text-primary/90 text-white/80 pointer-events-none bold"
            : "lg:hover:text-primary"
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}

function BarsButton({
  open,
  setOpen,
  className,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}): JSX.Element {
  return (
    <button
      className={cn("space-y-2 items-center justify-center z-50", className)}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div
        className={cn(
          "w-[30px] h-[4px] rounded-full transition",
          open ? "rotate-45 translate-y-[6px] bg-white" : "bg-black"
        )}
      ></div>
      <div
        className={cn(
          "w-[30px] h-[4px] rounded-full transition",
          open ? "-rotate-45 -translate-y-[6px] bg-white" : "bg-black"
        )}
      ></div>
    </button>
  );
}

function ResponsiveSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <div
      className={cn(
        "lg:hidden fixed block h-svh z-40 top-0 right-0 bg-green-500 px-8 py-16 w-[300px] transition shadow-xl",
        open ? "translate-x-0" : "translate-x-[400px]"
      )}
    >
      <div className="w-full h-full flex flex-col justify-between items-start !text-2xl tracking-tighter font-semibold">
        <ul className="text-whiteColor my-10 space-y-4">
          <NavLink href="/" onClick={() => setOpen((prev) => !prev)}>
            Profile
          </NavLink>
          <NavLink href="/create" onClick={() => setOpen((prev) => !prev)}>
            New round
          </NavLink>
          <NavLink href="/rounds" onClick={() => setOpen((prev) => !prev)}>
            Rounds
          </NavLink>
        </ul>
        <div className="flex flex-col space-y-4">
          <ConnectButton showBalance={false} accountStatus={"avatar"} />
        </div>
      </div>
    </div>
  );
}
