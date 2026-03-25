"use client";

import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

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
        <div className="hidden md:flex flex-row gap-2 items-center px-3 text-sm">
          <button
            className="text-gray-400 font-semibold px-4 py-1 rounded-sm cursor-pointer"
            onClick={handleLoginClick}
          >
            LOGIN
          </button>
          <button
            className="bg-linear-to-r from-primary to-primary-dark font-semibold px-4 py-2 rounded-sm cursor-pointer"
            onClick={handleRegisterClick}
          >
            REGISTER
          </button>
        </div>
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
          <div className="flex flex-col gap-2 px-4 py-2">
            <button
              className="text-gray-400 font-semibold px-4 py-1 rounded-sm cursor-pointer"
              onClick={handleLoginClick}
            >
              LOGIN
            </button>
            <button
              className="bg-linear-to-r from-primary to-primary-dark font-semibold px-4 py-1 rounded-sm cursor-pointer"
              onClick={handleRegisterClick}
            >
              REGISTER
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
