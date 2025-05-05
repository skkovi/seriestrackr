"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 max-w-4xl w-full flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-8 h-8 rounded-full shadow-md"
        />
        <h1 className="text-lg font-semibold text-white">SeriesTrackr</h1>
      </div>

      <nav className="flex items-center gap-4 text-sm text-white">
        <a href="/" className="hover:underline">
          <img src="/home.png" alt="Home" className="w-6 h-6" />
        </a>
        <button onClick={toggleMenu} className="">
          <img src="/burger.png" alt="Menu" className="w-6 h-6" />
        </button>
        {isOpen && (
          <div
            ref={headerRef}
            className="absolute top-16 right-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-lg shadow-md p-4 flex flex-col space-y-2"
          >
            <a href="/" className="hover:underline">
              Home
            </a>
            <Link href="/profile" target="_blank">
              <button className="hover:underline">Profile</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
