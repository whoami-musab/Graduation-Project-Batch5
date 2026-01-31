'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { save_exam, saveAnswer, previousQuestion, nextQuestion, submit_exam, resetExam } from '../../../../stateManagement/examSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Loading';
import { TiStopwatch } from "react-icons/ti";
import { getUserData } from '@/stateManagement/authSlice';


function MakeExam() {
    const [timer, setTimer] = useState('00:00');
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const router = useRouter();
    const dispatch = useDispatch();
    const intervalRef = useRef(null);

    const { questions, currentIndex, studentAnswer, started, loading } = useSelector((state) => state.exam);
    const question = questions ? questions[currentIndex] : null;
    const parts = question ? question.question.split('___') : [];
    const [isTimeUp, setIsTimeUp] = useState(false);
    const submittedRef = useRef(false);

    const {isAuthenticated} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(!isAuthenticated){
            router.replace('/auth/login')
        }
    }, [router, isAuthenticated])

    useEffect(() => {
        if (!loading && started && questions.length === 0) {
            router.replace('/dashboard/exams/instructions');
        }
    }, [questions, loading, started, router]);

    // ==================== Submit Exam Handler =======================
    const handleSubmit = useCallback(async () => {
        try {
            if (submittedRef.current) return;
            submittedRef.current = true;

            const examResult = await dispatch(submit_exam()).unwrap();
            await dispatch(save_exam(examResult)).unwrap();
            await dispatch(getUserData()).unwrap()
            Swal.fire({
                icon: 'success',
                title: 'Exam Submitted',
                text: 'Your exam has been submitted successfully.',
                confirmButtonText: 'OK'
            }).then(() => {
                dispatch(resetExam());
                router.push('/dashboard');
            });

        } catch (error) {
            submittedRef.current = false;
            console.error('Error submitting exam:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: String(error) || 'There was an error submitting your exam. Please try again.',
                confirmButtonText: 'OK'
            });
            return;
        }
    }, [dispatch, router]);

    useEffect(() => {
        if (!started) return;
        const whistle = new Audio('/sounds/whistle.mp3');
        whistle.play().catch(() => { console.log('User interaction to play audio') })

        let totalSec = 0;
        intervalRef.current = setInterval(() => {
            totalSec += 1;

            const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
            const sec = String(totalSec % 60).padStart(2, '0');
            setTimer(`${min}:${sec}`);
            // ------------------------------- Stop exam at 20 minutes -------------------------------
            if (min === '20' && sec === '00') {
                clearInterval(intervalRef.current);
                setIsTimeUp(true);
                Swal.fire({
                    icon: 'info',
                    title: 'Time is up!',
                    text: 'Your exam time has ended. Submitting your answers.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    handleSubmit()
                });
            }
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [started, handleSubmit]);

    if (loading) {
        return <Loading />;
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
                className='flex flex-col min-h-[300px] w-full md:w-[850px] mx-auto sm:m-auto md:rounded-4xl bg-black bg-opacity-50 p-10 border-t border-t-gray-600 border-r-2 border-r-gray-600 border-l-2 border-l-[#d4145a] border-b border-b-[#d4145a] gap-10'
            >
                <div className='flex items-center justify-between gap-6 text-2xl border-b-2 border-[#d4145a] pb-4'>
                    <p>{question?.type}</p>
                    <p className='flex items-center gap-1.5'>Time: {timer} <TiStopwatch /></p>
                </div>
                <div className='flex gap-6'>
                    {
                        question &&
                        <h1 className='text-2xl font-bold w-full'>
                            {parts[0]}
                            <input
                                type="text"
                                value={studentAnswer[currentIndex] || ''}
                                disabled={isTimeUp}
                                onKeyDown={(e) => {
                                    if (isTimeUp) return;
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        dispatch(nextQuestion());
                                    }
                                }}
                                onChange={
                                    (e) => {
                                        const value = e.target.value.replace(/[.,"<>;-_$^&*()-=+@!~`]/g, '');
                                        dispatch(saveAnswer({ index: currentIndex, answer: value }))
                                    }
                                }
                                className='bg-gray-200 text-[#d4145a] rounded-md px-2 m-1 py-1 mx-2 w-48 focus:border focus:border-[#d4145a] focus:outline-none font-bold'
                            />
                            {parts[1]}
                        </h1>
                    }
                </div>
                <div className='flex flex-col items-start justify-center gap-4 w-full mt-6'>
                    <div className='flex items-center justify-around gap-3 w-full'>
                        <button
                            disabled={isTimeUp}
                            onClick={() => dispatch(previousQuestion())}
                            className='bg-gray-600 hover:bg-gray-800 text-white py-2 px-2 text-md rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4'
                        >
                            Prev
                        </button>
                        {
                            currentIndex === questions.length - 1 ?
                                <button
                                    disabled={isTimeUp}
                                    onClick={handleSubmit}
                                    className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white py-2 px-2 text-md rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4'
                                >
                                    Submit
                                </button>
                                :
                                <button
                                    disabled={isTimeUp}
                                    className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white py-2 px-2 text-md rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4'
                                    onClick={() => dispatch(nextQuestion())}
                                >
                                    Next
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeExam
