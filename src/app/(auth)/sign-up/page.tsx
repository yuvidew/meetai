import React from 'react'
import { SignUpForm } from '../_components/SignUpForm'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


const SignUp = async () => {
    const session = await auth.api.getSession({
            headers: await headers()
        });
    
        if (!!session) {
            redirect("/");
        }
    return (
        <>
            {/* start to adding a  sign in form  */}
                <SignUpForm/>
            {/* end to adding a  sign in form  */}
        </>
    )
}

export default SignUp
