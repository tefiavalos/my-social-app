"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authToken = useSelector((state: RootState) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!authToken) {
      router.replace("/login");
    }
  }, [authToken, router]);

  if (!isMounted || !authToken) return null;

  return <>{children}</>;
}
