'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_exam_details } from '../../../../../stateManagement/examSlice';
import Loading from '../../../../Loading';

function ExamDetails() {
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const { id } = useParams() // Get the exam ID from the URL parameters
    const { getExamDetails, error, loading } = useSelector((state) => state.exam); // Access exam details from Redux state
    const router = useRouter(); // Next.js router for navigation
    const dispatch = useDispatch(); // Redux dispatch function

    const {isAuthenticated} = useSelector(state=>state.auth)

    useEffect(()=>{
        if(!isAuthenticated){
            router.replace('/auth/login')
        }
    }, [router, isAuthenticated])

    // ===================== Get Exam Details =======================
    useEffect(() => {
        if (id) dispatch(get_exam_details(id));
    }, [dispatch, id]);

    // ===================== Redirect if error =======================
    useEffect(() => {
        if (!loading && !error && id && !getExamDetails) {
            router.replace('/dashboard/exams');
        }
    }, [loading, error, getExamDetails, router, id]);

    if(loading){
        return <Loading />;
    }

    return (
        <div
            className="flex min-h-screen text-white w-full"
            style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-5xl mx-auto p-4 md:p-10">
                <div className="bg-black/55 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-[#d4145a]/40 shadow-xl">
                    {/* Header */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center justify-center rounded-full bg-white w-16 h-16 md:w-20 md:h-20 border-2 border-[#d4145a]">
                            <FaUserAlt className="text-black text-3xl md:text-4xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">Exam Details</h1>
                            <p className="text-base md:text-lg opacity-80">ID: {id}</p>
                        </div>
                    </div>

                    {/* Summary cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-sm opacity-70">Exam Date</p>
                            <p className="text-lg font-semibold mt-1">{new Date(getExamDetails?.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-sm opacity-70">Time</p>
                            <p className="text-lg font-semibold mt-1">{new Date(getExamDetails?.startTime).toLocaleTimeString()} → {new Date(getExamDetails?.endTime).toLocaleTimeString()}</p>
                            <p className="text-sm opacity-70 mt-1">Duration: <span className="text-white">{}</span></p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <p className="text-sm opacity-70">Level</p>
                            <p className="text-2xl font-bold mt-1 text-[#d4145a]">{getExamDetails?.level ?? 'N/A'}</p>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold">Questions</h2>

                        <div className="mt-4 flex flex-col gap-4">
                            {(getExamDetails?.questions ?? []).map((q, idx) => {
                                const userAns = (q?.userAnswer ?? '').trim();
                                const correctAns = (q?.correctAnswer ?? '').trim();
                                const isCorrect = !!q?.isCorrect;

                                return (
                                    <div
                                        key={q?._id ?? idx}
                                        className={`rounded-2xl border p-5 bg-white/5 ${isCorrect ? 'border-green-500/40' : 'border-red-500/40'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-lg font-semibold">
                                                <span className="opacity-70">#{idx + 1}</span> {q?.question}
                                            </p>
                                            <span
                                                className={`text-sm font-bold px-3 py-1 rounded-full ${isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                                    }`}
                                            >
                                                {isCorrect ? 'Correct' : 'Wrong'}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-base">
                                            <div className="rounded-xl bg-black/30 p-4 border border-white/10">
                                                <p className="text-sm opacity-70">Your Answer</p>
                                                <p className={`mt-1 font-semibold ${userAns ? 'text-white' : 'text-yellow-300'}`}>
                                                    {userAns || 'No answer'}
                                                </p>
                                            </div>

                                            <div className="rounded-xl bg-black/30 p-4 border border-white/10">
                                                <p className="text-sm opacity-70">Correct Answer</p>
                                                <p className="mt-1 font-semibold text-[#d4145a]">
                                                    {correctAns || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={() => router.push('/dashboard/exams')}
                                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white py-2 px-4 rounded-full"
                            >
                                Back
                            </button>

                            <button
                                onClick={() => router.push('/dashboard/exams/instructions')}
                                className="bg-[#d4145a] hover:opacity-90 text-white py-2 px-4 rounded-full"
                            >
                                Try new test
                            </button>
                        </div>
                    </div>

                </div>
            </div>  
        </div>
    );
}

export default ExamDetails