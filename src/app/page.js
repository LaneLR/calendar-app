import UserCalendar from "@/components/Calendar";
import CalendarSkeleton from "@/components/CalendarSkeletion";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<CalendarSkeleton />}>
        <UserCalendar />
      </Suspense>
    </>
  );
}
