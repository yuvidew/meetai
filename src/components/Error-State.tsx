import { AlertCircleIcon } from 'lucide-react'
import React from 'react';

/**
 * ErrorState component displays a centered error message
 * with an icon, title, and description.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The main error title to display
 * @param {string} props.description - A more detailed error description
 */

export const ErrorState = (
    {
        title,
        description
    }:
    {
        title : string,
        description : string
    }
) => {
    return (
        <div className=' py-4 px-8 flex items-center justify-center h-[90vh]'>
            <div className=' flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
                <AlertCircleIcon className=' size-8 text-red-500' />
                <div className=' flex flex-col gap-y-2 text-center'>
                    <h6 className=' text-lg font-medium'>{title}</h6>
                    <p className=' text-sm'>{description}</p>
                </div>
            </div>
        </div>
    )
}
