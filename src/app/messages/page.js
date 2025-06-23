import styled from "styled-components"
import MessagesSkeleton from "@/components/MessagesSkeleton"
import { Suspense } from "react"
import DetailsContainer from "@/components/DetailsContainer"


export default function MessagesPage() {


    return (
        <>
        <Suspense fallback={<MessagesSkeleton />}>
            <DetailsContainer />
        </Suspense>
            
        </>
    )
}