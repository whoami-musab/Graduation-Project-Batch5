'use client';
import React, { useEffect, useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Loading from '../../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { get_exams } from '@/stateManagement/examSlice';
import Link from 'next/link';

function Exams() {
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const router = useRouter();

    const dispatch = useDispatch()
    const { isAuthenticated, bootstraped } = useSelector(state=>state.auth)
    const { oldExams, loading } = useSelector((state) => state.exam);

    useEffect(()=>{
        if(bootstraped && !isAuthenticated){
            router.replace('/auth/login')
        }
    }, [router, isAuthenticated, bootstraped])

    useEffect(() => {
        if(isAuthenticated && bootstraped) dispatch(get_exams());
    }, [dispatch, isAuthenticated, bootstraped]);

    if(!bootstraped) return <Loading />

    if(!isAuthenticated) return <Loading />

    if (loading)  return <Loading />;

    const exams = oldExams || [];

    if (exams.length === 0) {
        return (
            <div
                className='flex min-h-screen text-white w-full'
                style={{
                    backgroundImage: `url(${bgImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className='flex flex-col w-full md:w-[700px] mx-auto sm:m-auto text-3xl md:rounded-4xl bg-black bg-opacity-50 p-10 border-t border-t-gray-600 border-r-2 border-r-gray-600 border-l-2 border-l-[#d4145a] border-b border-b-[#d4145a] gap-10'
                >
                    <h1 className='text-4xl font-bold'>All exam data will be shown here</h1>
                    <button className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white py-2 px-2 text-md rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4'
                        onClick={() => router.push('/dashboard/exams/instructions')}>
                        Try the test
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className='flex min-h-screen text-white w-full py-5'
            style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className='flex flex-col w-full md:min-w-[700px] md:max-w-[1000px] mx-auto sm:m-auto text-3xl md:rounded-4xl bg-black bg-opacity-50 p-10 border-t border-t-gray-600 border-r-2 border-r-gray-600 border-l-2 border-l-[#d4145a] border-b border-b-[#d4145a] gap-10'
            >
                <div className='flex gap-6'>
                    <div className='flex items-center justify-center rounded-full bg-white w-20 h-20 border-2 border-[#d4145a]'>
                        <FaUserAlt className="text-black text-4xl" />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-4xl font-bold'>Exams</h1>
                        <span className='text-lg'>All Data</span>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center gap-4 w-full mt-6'>
                    <button className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white py-2 px-2 text-sm rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4'
                        onClick={() => router.push('/dashboard/exams/instructions')}>
                        Try new test
                    </button>
                    {/* ============ Exam data ============ */}
                    <div className='flex flex-col gap-3 w-full'>
                        {
                            exams.map((exam, index) => {

                                const dt = exam?.createdAt ? new Date(exam?.createdAt) : null;
                                const examDate = dt && !isNaN(dt.getTime()) ? dt.toLocaleString() : 'N/A';

                                const startTime = exam?.startTime ? new Date(exam?.startTime) : null;
                                const formattedStartTime = startTime && !isNaN(startTime.getTime()) ? startTime.toLocaleTimeString() : 'N/A';

                                const endTime = exam?.endTime ? new Date(exam?.endTime) : null;
                                const formattedEndTime = endTime && !isNaN(endTime.getTime()) ? endTime.toLocaleTimeString() : 'N/A';

                                return (
                                    <div key={exam._id} className='flex flex-col gap-2 border-b border-gray-600 pb-2'>
                                        <Link href={`/dashboard/exams/details/${exam._id}`} className='text-3xl text-[#d4145a] font-bold'>Exam - Details</Link>
                                        <span className='text-xl font-semibold'>Exam Date: {examDate}</span>
                                        <span className='text-xl font-semibold'>Start Time: {formattedStartTime} - End Time: {formattedEndTime}</span>
                                        <span className='text-xl font-bold'>Level: <span className='text-[#d4145a]'>{exam?.level}</span></span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exams
