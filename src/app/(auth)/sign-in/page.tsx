import React from 'react'
import { SignInForm } from '../_components/SignInForm'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const SignIn = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!!session) {
        redirect("/");
    }
    return (
        <>
            {/* start to adding sign in form */}
            <SignInForm />
            {/* end to adding sign in form */}
        </>
    )
}

export default SignIn
