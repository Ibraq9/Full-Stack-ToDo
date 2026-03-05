import Image from "next/image";
import Logo from "../../../public/My_Assets/Logo.png";
import React from "react";
import { stackServerApp } from "../../stack";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import ModeToggle from "./modeToggle";

const NavBar = async () => {
  const navigate = stackServerApp.urls;
  const user = await stackServerApp.getUser();

  return (
    <nav className="fixed top-0 z-50 flex w-full justify-center px-4 pt-4">
      <div className="flex h-16 w-full items-center justify-between rounded-2xl border dark:border-white/30 border-white bg-white/30 px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all dark:bg-black/5 sm:w-11/12 lg:w-3/4">
        {/* Logo Section */}
        <div className="flex items-center transition-transform hover:scale-105 active:scale-95">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={130}
              height={36}
              className="object-contain dark:brightness-110"
            />
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <UserButton />
              <Link
                href={navigate.signOut}
                className="group flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/20 hover:text-red-400 border border-white/10 shadow-sm"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Sign out</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-4">
              <Link
                href={navigate.signIn}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>

              <Link
                href={navigate.signUp}
                className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/20 px-5 py-2 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-md transition-all hover:bg-white/30 hover:border-white/60 active:scale-95 dark:text-white dark:bg-white/10 dark:hover:bg-white/20"
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          <div className="ml-2 border-l border-white/10 pl-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
