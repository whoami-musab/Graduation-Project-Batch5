'use client'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loading from '../Loading'
import { bootstrapAuth } from '@/stateManagement/authSlice';


function Dashboard() {
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const myBorderColor = '#d4145a';
    const { isAuthenticated, bootstraped, loading } = useSelector(state => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/auth/login')
        }
    }, [router, isAuthenticated])

    useEffect(() => {
        if (!bootstraped) dispatch(bootstrapAuth());
    }, [bootstraped, dispatch]);

    if (loading) {
        return <Loading />
    }

    return (
        isAuthenticated && <div
            className='flex min-h-screen text-white' style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* ====================================================================== */}
            {/* ========== Dashboard Content & Links ========== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full sm:h-fit sm:m-auto md:h-fit md:w-fit mx-auto md:m-auto bg-black bg-opacity-50 p-10 rounded">
                <Link
                    href="dashboard/profile"
                    className={`border-4 p-6 rounded-lg flex flex-col items-start justify-center gap-5 min-w-64 sm:h-fit hover:shadow-lg hover:shadow-[#d4145a] transition-all `}
                    style={{ borderColor: myBorderColor }}
                >
                    <FaUser className={`text-5xl`} />
                    <div className='flex flex-col'>
                        <p className="text-3xl font-bold mb-4 flex items-center">
                            Profile
                        </p>
                        <span>
                            All your data & Points
                        </span>
                    </div>
                </Link>
                <Link
                    href="/dashboard/exams"
                    className={`border-4 p-6 rounded-lg flex flex-col items-start justify-center gap-5 min-w-64 sm:h-fit hover:shadow-lg hover:shadow-[#d4145a] transition-all `}
                    style={{ borderColor: myBorderColor }}
                >
                    <FaFile className='text-5xl' />
                    <div className='flex flex-col'>
                        <p className="text-3xl font-bold mb-4 flex items-center">
                            Exam
                        </p>
                        <span>
                            All your exam Data
                        </span>
                    </div>
                </Link>
                <Link
                    href="/dashboard/manage"
                    className={`border-4 p-6 rounded-lg flex flex-col items-start justify-center gap-5 min-w-64 sm:h-fit hover:shadow-lg hover:shadow-[#d4145a] transition-all `}
                    style={{ borderColor: myBorderColor }}
                >
                    <CiBoxList className='text-5xl' />
                    <div className='flex flex-col'>
                        <p className="text-3xl font-bold mb-4 flex items-center">
                            Manage
                        </p>
                        <span>
                            All about university
                        </span>
                    </div>
                </Link>
            </div>
            {/* ====================================================================== */}
        </div>
    )
}

export default Dashboard
