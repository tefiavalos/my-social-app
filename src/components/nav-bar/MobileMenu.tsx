import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { ReactNode } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  shouldRenderLogoutButton: () => ReactNode;
}

export default function MobileMenu({
  isOpen,
  onClose,
  shouldRenderLogoutButton,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
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
      <button className="absolute top-6 right-6 text-2xl" onClick={onClose}>
        ✖
      </button>
      <NavItems />
      {shouldRenderLogoutButton()}
    </div>
  );
}
