import ContactsSkeleton from "@/components/ContactsSkeleton"
import DetailsContainer from "@/components/DetailsContainer"
import SearchBar from "@/components/SearchBar"
import { Suspense } from "react"

export default function ContactsPage() {


    return (
        <>
        <Suspense fallback={<ContactsSkeleton />}>
        <SearchBar />
            <DetailsContainer />
        </Suspense>
            
        </>
    )
}