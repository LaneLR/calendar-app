"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCalendar } from "@/context/CalendarContext";

export default function RedirectPath() {
  const { isLoggedIn } = useCalendar();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const routes = ["/login", "/register"];
    const isPage = routes.includes(pathname);

    if (isLoggedIn && isPage) {
      router.replace("/"); 
    }
  }, [pathname]);

  return null;
}
