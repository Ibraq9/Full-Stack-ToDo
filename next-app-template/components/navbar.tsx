import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const searchInput = (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-base text-gray-400 pointer-events-none flex-shrink-0">
        <SearchIcon />
      </span>
      <input
        aria-label="Search"
        className="pl-10 pr-3 py-2 rounded bg-gray-100 text-sm outline-none w-full"
        placeholder="Search..."
        type="search"
      />
      <kbd className="hidden lg:inline-block absolute right-3 bg-gray-200 px-1 rounded text-xs text-gray-600">
        ⌘K
      </kbd>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Brand and nav items */}
        <div className="flex items-center gap-4">
          <NextLink className="flex items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
          <ul className="hidden lg:flex gap-4 ml-2">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NextLink
                  className={clsx(
                    "text-gray-700 hover:text-orange-700 transition font-medium px-2 py-1 rounded",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop right content */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden sm:flex gap-2">
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-500"
            >
              <TwitterIcon />
            </a>
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-gray-500 hover:text-indigo-500"
            >
              <DiscordIcon />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="text-gray-500 hover:text-black"
            >
              <GithubIcon />
            </a>
            <ThemeSwitch />
          </div>
          <div className="hidden lg:block w-64">{searchInput}</div>
          <div className="hidden md:block">
            <a
              href={siteConfig.links.sponsor}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-normal text-gray-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              <HeartFilledIcon className="text-red-500" />
              Sponsor
            </a>
          </div>
        </div>

        {/* Mobile right content */}
        <div className="sm:hidden flex items-center gap-2">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="text-gray-500 hover:text-black"
          >
            <GithubIcon />
          </a>
          <ThemeSwitch />
          <button
            className="ml-2 p-2 rounded hover:bg-gray-100"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Hamburger icon */}
            <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="p-4">{searchInput}</div>
          <ul className="flex flex-col gap-2 px-4 pb-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <a
                  href="#"
                  className={clsx(
                    "block px-4 py-2 rounded text-lg",
                    index === 2
                      ? "text-orange-700"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "text-red-600"
                      : "text-gray-700"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};