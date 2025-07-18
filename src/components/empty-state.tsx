

import Image from 'next/image';
import React from 'react';


export const EmptyState = (
    {
        title,
        description
    }:
        {
            title: string,
            description: string
        }
) => {
    return (
        <div className=' flex flex-col items-center justify-center '>
            <Image src="/empty.svg" alt = "" width={240} height={240} />
            <div className=' flex flex-col gap-y-6 mx-w-md mx-auto text-center'>
                <h6 className=' text-lg font-medium'>{title}</h6>
                <p className=' text-sm text-muted-foreground'>{description}</p>
            </div>
        </div>
    )
}
