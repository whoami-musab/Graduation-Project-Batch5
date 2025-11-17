'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import { FaUserAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

function Login() {

    const bg = '/imgs/login.png';
    const myBorderColor = '#d4145a';

    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_Password] = useState('');
    const [firstName, setFirstName] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // if (!username || !password || !firstName || !lastName || !email || !phone || !re_password) {
        //     return Swal.fire({
        //         icon: 'warning',
        //         title: 'All fields are required.',
        //         confirmButtonColor: '#d4145a'
        //     });
        // }

        // create regex to check if password contains letters and numbers
        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
            return Swal.fire({
                icon: 'error',
                title: 'Password must contain at least one Capital letter, number. and special character. Minimum eight characters long.',
                confirmButtonColor: '#d4145a'
            })
        }

    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div
                className={`bg-linear-to-r from-[#d4145a] via-gray-800 to-gray-900 relative p-8 rounded-lg shadow-lg max-w-lg w-full border-l-2 border-b border-[#d4145a]`}
                style={{
                    "--tw-gradient-from-position": "-90%",
                    "--tw-gradient-via-position": "50%",
                    "--tw-gradient-to-position": "100%",
                }}
            >
                <div className={`flex flex-col items-center justify-center rounded-full absolute bg-gray-700 w-20 h-20 border-2 border-[${myBorderColor}] -top-12 left-1/2 transform -translate-x-1/2`}>
                    <FaUserAlt className="text-white text-4xl" />
                </div>
                <form className="flex flex-col space-y-4">
                    <div className='flex w-full gap-4'>
                        <div className='w-1/2'>
                            <label htmlFor="first name" className="ml-5 block text-lg text-white font-semibold">First Name</label>
                            <input
                                type="text"
                                id="first name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor="last name" className="ml-5 block text-lg text-white font-semibold">Last Name</label>
                            <input
                                type="text"
                                id="last name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                            />
                        </div>
                    </div>
                    <div className='flex w-full gap-4'>
                        <div className='w-2/3'>
                            <label htmlFor="email" className="ml-5 block text-lg text-white font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username or Email"
                                className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                            />
                        </div>
                        <div className='w-1/3'>
                            <label htmlFor="username" className="ml-5 block text-lg text-white font-semibold">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="ml-5 block text-lg text-white font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                        />
                    </div>
                    <div>
                        <label htmlFor="re password" className="ml-5 block text-lg text-white font-semibold">Type your password again</label>
                        <input
                            type="password"
                            id="re_password"
                            value={re_password}
                            onChange={e => setRe_Password(e.target.value)}
                            placeholder="Type your password again"
                            className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                        />
                    </div>
                    <button
                        onClick={e => handleRegister(e)}
                        className="bg-[#d4145a] cursor-pointer text-white py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300 w-1/2 self-center block mt-4"
                    >
                        Register
                    </button>
                </form>
            </div>
            <Link href="/auth/login" className="text-[#d4145a] mt-4 block text-center hover:underline text-2xl">
                Already have an account? Login
            </Link>
        </div>
    )
}

export default Login;
