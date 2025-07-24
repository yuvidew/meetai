import Image from "next/image";
import React from "react";

/**
 * EmptyState component
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title text to display
 * @param {string} props.description - Description text to display
 * @param {string} props.image - image to display
 */
export const EmptyState = ({
    title,
    description,
    image = "/empty.svg"
}: {
    title: string;
    description: string;
    image? : string
}) => {
    return (
        <div className=" flex flex-col items-center justify-center ">
            <Image src={image} alt="" width={240} height={240} />
            <div className=" flex flex-col gap-y-6 mx-w-md mx-auto text-center">
                <h6 className=" text-lg font-medium">{title}</h6>
                <p className=" text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};
