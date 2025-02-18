"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Button } from "@/components";
import NavItems from "./NavItems";
import MobileMenu from "./MobileMenu";
import HamburgerButton from "./HamburguerButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);

  const shouldRenderLogoutButton = () => {
    if (user) {
      return (
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/50 text-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            <NavItems />
            {shouldRenderLogoutButton()}
          </nav>

          <HamburgerButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        shouldRenderLogoutButton={shouldRenderLogoutButton}
      />
    </>
  );
}
