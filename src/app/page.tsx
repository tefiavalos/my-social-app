"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Home() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/feed");
    }
  }, [user, router]);

  return null;
}
