'use client'
import React, {useEffect} from 'react'
import { TbError404 } from "react-icons/tb";
import { useRouter } from 'next/navigation';

function NotFound() {
    // create function to prevent right click

    const router = useRouter()
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
        useEffect(() => {
        document.addEventListener('contextmenu', (e)=>{e.preventDefault()});
        
        return () => {
            document.removeEventListener('contextmenu', (e)=>{e.preventDefault()});
        };
    }, []);
    return (
        <div className='flex items-center justify-center min-h-screen text-white' style={{
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
            >
            <div className='flex min-h-screen flex-col items-center justify-center gap-6'>
                <TbError404 className={`text-9xl text-[#d4145a]`} />
                <h1 className="text-4xl font-bold">Page Not Found</h1>
                <p className='text-center max-w-md'>The page you are looking for does not exist. It might have been moved or deleted.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-6 py-3 bg-[#d4145a] text-white rounded hover:bg-[#b0134a] transition cursor-pointer"
                >
                    Go to Back
                </button>
            </div>
        </div>
    )
}

export default NotFound
