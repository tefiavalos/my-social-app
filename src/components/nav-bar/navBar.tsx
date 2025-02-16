"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import Button from "../button/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/50 text-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/feed" className="hover:text-gray-300">
              Feed
            </Link>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1 w-8 h-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-full h-1 bg-white rounded"></span>
            <span className="w-full h-1 bg-white rounded"></span>
            <span className="w-full h-1 bg-white rounded"></span>
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center gap-8 text-xl md:hidden h-100 z-50 pt-5">
                      <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <button
            className="absolute top-6 right-6 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          <Link href="/feed" onClick={() => setIsOpen(false)}>
            Feed
          </Link>
          <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
        </div>
      )}
    </>
  );
}
