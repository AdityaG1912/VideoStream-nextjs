"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderAuthLinks = () => {
    if (pathname === "/login") {
      return (
        <Link href="/register" className="btn btn-outline btn-sm">
          Sign Up
        </Link>
      );
    }
    if (pathname === "/register") {
      return (
        <Link href="/login" className="btn btn-outline btn-sm">
          Login
        </Link>
      );
    }
    if (!session) {
      return (
        <>
          <Link href="/login" className="btn btn-outline btn-sm mr-2">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold hover:text-indigo-400 transition-colors"
          prefetch={true}
          onClick={() =>
            showNotification("Welcome to ImageKit ReelsPro", "info")
          }
        >
          <Home className="w-6 h-6" />
          Video with AI
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-4 relative">
          {session ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="btn btn-ghost btn-circle flex items-center cursor-pointer justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition"
              >
                <User className="w-5 h-5" />
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 space-y-1 text-gray-100 z-50">
                  <li className="px-4 py-2 text-sm opacity-80 truncate">
                    {session.user?.email?.split("@")[0]}
                  </li>
                  <div className="border-t border-gray-700 my-1"></div>
                  <li>
                    <Link
                      href="/upload"
                      className="block px-4 py-2 cursor-pointer rounded hover:bg-gray-700 transition"
                      onClick={() =>
                        showNotification("Welcome to Admin Dashboard", "info")
                      }
                    >
                      Video Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-videos"
                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                      onClick={() =>
                        showNotification(
                          "Here are your uploaded videos",
                          "info"
                        )
                      }
                    >
                      My Videos
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left cursor-pointer px-4 py-2 rounded text-red-500 hover:bg-gray-700 transition"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            renderAuthLinks()
          )}
        </div>
      </div>
    </header>
  );
}
