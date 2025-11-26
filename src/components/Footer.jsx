'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

function Footer() {
        const pathname = usePathname()
    const isLoginPage = pathname === '/auth/login' || pathname === '/auth/register';
    if (isLoginPage) {
        return null; // Do not render the header on the login page
    }
    return (
        <div className="flex flex-col w-full items-center bg-linear-to-br from-[#d4145a] via-gray-800 to-red-900">
            <h1 className="text-white font-bold text-md p-4">
                © 2025 English Level Determination System. All rights reserved.
            </h1>
            <p className="text-white font-medium text-sm pb-4">
                Made with ❤️ by Group-3 Team
            </p>
        </div>
    )
}

export default Footer
