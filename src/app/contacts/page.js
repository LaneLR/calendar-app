import ContactsSkeleton from "@/components/ContactsSkeleton"
import DetailsContainer from "@/components/DetailsContainer"
import { Suspense } from "react"

export default function ContactsPage() {


    return (
        <>
        <Suspense fallback={<ContactsSkeleton />}>
            <DetailsContainer />
        </Suspense>
            
        </>
    )
}