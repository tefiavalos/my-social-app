"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Home() {
  const router = useRouter();
  const authToken = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!authToken) {
      router.replace("/login");
    } else {
      router.replace("/feed");
    }
  }, [authToken, router]);

  return null;
}
