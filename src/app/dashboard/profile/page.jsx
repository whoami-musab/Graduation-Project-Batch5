'use client';
import React, { useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import {getUserData} from '../../../stateManagement/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Loading'

function Profile() {
    const bgImageUrl = '/imgs/login.png'; // Example background image URL
    const dispatch = useDispatch();
    const {userData, loading} = useSelector((state) => state.auth);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if(!userData && token){
            dispatch(getUserData());
        }
    }, [dispatch, userData]);

    const levelDisplay = userData?.level ?? "No exams have been taken";

    if(loading){
        return <Loading />;
    }

    return (
        <div
            className='flex min-h-screen text-white w-full' style={{
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
                        <h1 className='text-4xl font-bold'>Profile</h1>
                        <span className='text-lg'>Personal Data</span>
                    </div>
                </div>
                <div className='flex flex-col flex-wrap md:grid md:grid-cols-2 gap-4 w-full mt-6'>
                    <div className='flex flex-col gap-3'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Username</span>
                        <span className='text-xl font-semibold'>{userData?.username}</span>
                    </div>
                    <div className='flex flex-col flex-wrap'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Email</span>
                        <span className='text-xl font-semibold'>{userData?.email}</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Country</span>
                        <span className='text-xl font-semibold'>{userData?.country === null ? "No country specified" : userData?.country}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Level</span>
                        <span className='text-xl font-semibold'>{levelDisplay}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Phone</span>
                        <span className='text-xl font-semibold'>{userData?.phone}</span>
                    </div>
                    <div className='flex flex-col col-span-2'>
                        <span className='text-3xl text-[#d4145a] font-bold'>Total Exam Count</span>
                        <span className='text-xl font-semibold'>&lt; {userData?.level === null ? "No exams have been taken" : userData?.level} &gt;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
