'use client';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { make_exam, startExam, resetExam } from './../../../../stateManagement/examSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function ExamInstructions() {
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const [agree, setAgree] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    
    const {isAuthenticated} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(!isAuthenticated){
            router.replace('/auth/login')
        }
    }, [router, isAuthenticated])

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
                <h1 className='text-4xl font-bold'>Read the test instructions</h1>
                <div className='flex flex-col gap-4 text-lg'>
                    <p>1. Make sure you have a stable internet connection throughout the test.</p>
                    <p>2. Do not refresh the page or navigate away during the test.</p>
                    <p>3. Each question must be answered within the allotted time.</p>
                    <p>4. Exam time is just 20 minutes.</p>
                    <p>5. Be careful before submitting your answer.</p>
                    <p>6. Once you submit your answers, you cannot change them.</p>
                    <p>7. Good luck.</p>
                </div>
                <div className='flex items-center gap-4'>
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="w-6 h-6 cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-lg cursor-pointer">I have read and agree to the instructions</label>
                </div>
                <button
                    className={`${agree ? 'bg-[#d4145a]' : 'bg-gray-500'} text-sm hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white py-2 px-2 text-md rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4`}
                    disabled={!agree}
                    onClick={async () => {
                        try {
                            dispatch(resetExam())
                            await dispatch(make_exam()).unwrap()
                            dispatch(startExam());
                            router.push('/dashboard/exams/exam');
                        } catch (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: String(error) || 'Failed to start the exam. Please try again.',
                                confirmButtonText: 'OK'
                            });
                        }
                    }}
                >
                    I Agree and Continue
                </button>
            </div>
        </div>
    )
}

export default ExamInstructions
