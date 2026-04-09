"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    signOut();
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    router.push("/profile");
  };

  const handleNewReviewClick = () => {
    setShowDropdown(false);
    router.push("/post");
  };

  useEffect(() => {
    if (!showDropdown) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedDesktopDropdown =
        dropdownRef.current?.contains(target) ?? false;
      const clickedMobileDropdown =
        mobileDropdownRef.current?.contains(target) ?? false;

      if (!clickedDesktopDropdown && !clickedMobileDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="dark:bg-neutral">
      <div
        className={`${space_grotesk.className} flex flex-row gap-3 flex-wrap justify-between py-2`}
      >
        <div className="flex flex-row md:gap-3 flex-wrap items-center">
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden px-2 py-1 text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
          {/* Navbar Logo */}
          <div className="px-2">
            <Link href={"/"} className="flex flex-row gap-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40}></Image>
              <span className="text-sky-400 font-bold block self-center">
                CodeReview Hub
              </span>
            </Link>
          </div>
          {/* Navigation Links - Desktop */}
          <nav className="hidden md:block pl-2 text-sm">
            <ul className="text-tertiary font-semibold flex flex-row gap-3">
              <li>
                <Link href={"/posts"}>
                  <span>POSTS</span>
                </Link>
              </li>
              <li>
                <Link href={"/reviews"}>
                  <span>REVIEWS</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Desktop Buttons */}
        {session.status === "authenticated" ? (
          <div className="px-3 relative hidden md:block" ref={dropdownRef}>
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleDropdownToggle}
              aria-haspopup="menu"
              aria-expanded={showDropdown}
            >
              <span className="bg-linear-to-r from-primary to-primary-dark font-semibold px-3 py-2 text-black rounded-full uppercase">
                {session.data.user.name?.slice(0, 2) ??
                  session.data.user.email?.slice(0, 2) ??
                  "US"}
              </span>
              <span className="text-sm font-semibold text-tertiary">
                {session.data.user.name ?? session.data.user.email ?? "User"}
              </span>
            </button>
            <div
              className={`absolute right-0 top-full mt-2 z-50 w-48 overflow-hidden rounded-md border border-gray-700 bg-neutral shadow-lg ${inter.className} ${showDropdown ? "block" : "hidden"}`}
              role="menu"
            >
              <button
                type="button"
                className="block px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer w-full text-sm"
                onClick={handleProfileClick}
              >
                Profile
              </button>
              <button
                type="button"
                className="block px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer w-full text-sm"
                onClick={handleNewReviewClick}
              >
                New Review
              </button>
              <button
                type="button"
                className="block px-4 py-2 text-left text-gray-300 hover:bg-gray-700 cursor-pointer w-full text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-row gap-2 items-center px-3 text-sm">
            <button
              className="text-gray-400 font-semibold px-4 py-1 rounded-sm cursor-pointer"
              onClick={handleLoginClick}
            >
              LOGIN
            </button>
            <button
              className="bg-linear-to-r from-primary to-primary-dark font-semibold px-4 py-2 text-black rounded-sm cursor-pointer"
              onClick={handleRegisterClick}
            >
              REGISTER
            </button>
          </div>
        )}
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral border-t border-gray-700">
          <nav className="px-4 py-2">
            <ul className="text-tertiary font-semibold flex flex-col gap-2">
              <li>
                <Link href={"/posts"} onClick={toggleMenu}>
                  <span>POSTS</span>
                </Link>
              </li>
              <li>
                <Link href={"/reviews"} onClick={toggleMenu}>
                  <span>REVIEWS</span>
                </Link>
              </li>
            </ul>
          </nav>
          {session.status === "authenticated" ? (
            <div className="px-4 py-2" ref={mobileDropdownRef}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-gray-700 px-4 py-2 text-left"
                onClick={handleDropdownToggle}
                aria-haspopup="menu"
                aria-expanded={showDropdown}
              >
                <span className="flex items-center gap-3">
                  <span className="bg-linear-to-r from-primary to-primary-dark rounded-full px-3 py-2 font-semibold uppercase text-black">
                    {session.data.user.name?.slice(0, 2) ??
                      session.data.user.email?.slice(0, 2) ??
                      "US"}
                  </span>
                  <span className="text-sm font-semibold text-tertiary">
                    {session.data.user.name ??
                      session.data.user.email ??
                      "User"}
                  </span>
                </span>
              </button>
              <div
                className={`mt-2 overflow-hidden rounded-md border border-gray-700 bg-neutral shadow-lg ${inter.className} ${showDropdown ? "block" : "hidden"}`}
                role="menu"
              >
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  onClick={handleNewReviewClick}
                >
                  New Review
                </button>
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 px-4 py-2">
              <button
                className="text-gray-400 font-semibold px-4 py-1 rounded-sm cursor-pointer"
                onClick={handleLoginClick}
              >
                LOGIN
              </button>
              <button
                className="bg-linear-to-r from-primary text-black to-primary-dark font-semibold px-4 py-1 rounded-sm cursor-pointer"
                onClick={handleRegisterClick}
              >
                REGISTER
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
