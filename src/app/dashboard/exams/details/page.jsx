'use client';
import React ,{useState} from 'react'
import { FaUserAlt } from "react-icons/fa";

function Profile() {
    const examdate = new Date().toLocaleDateString()
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const [examID, setExamID] = useState(0);
    const [examDate, setExamDate] = useState(examdate);
    if(examID === 0 || examDate === null) {
        return(
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
                <h1 className='text-4xl font-bold'>All exams data show here</h1>
            </div>
        </div>
        )
    }
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
                    <div className='flex flex-col gap-3'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Exam - {examID}</span>
                        <span className='text-xl font-semibold'>{examDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
