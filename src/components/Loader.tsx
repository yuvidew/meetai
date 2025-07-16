import React from 'react'
import Spinner from './Spinner'

export const Loader = () => {
    return (
        <main className=" flex items-center justify-center h-[90vh]">
            <Spinner color="default" size="lg" />
        </main>
    )
}
