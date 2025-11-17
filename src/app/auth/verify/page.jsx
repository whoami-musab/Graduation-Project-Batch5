'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import { FaUserAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

function Login() {

    const bg = '/imgs/login.png';
    const myBorderColor = '#d4145a';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if(!username || !password) {
            return Swal.fire({
                icon: 'warning',
                title: 'Both fields are required.',
                confirmButtonColor: '#d4145a'
            });
        }

        if(username === 'admin' && password === 'password') {
            setUsername('');
            setPassword('');
            return Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                confirmButtonColor: '#d4145a'
            });
        }else{
            return Swal.fire({
                icon: 'error',
                title: 'Invalid username or password.',
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
                className={`bg-linear-to-r from-[#d4145a] via-gray-800 to-gray-900 relative p-8 rounded-lg shadow-lg max-w-md w-full border-l-2 border-b-1 border-[#d4145a]`}
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
                    <div>
                        <label htmlFor="username" className="ml-5 block text-lg text-white font-semibold">Email</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                            placeholder="Username or Email"
                            className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="ml-5 block text-lg text-white font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            placeholder="Password"
                            className={`mt-1 block w-full px-4 py-3 bg-white text-xl text-[#d4145a] rounded-full shadow-sm focus:outline-none`}
                        />
                    </div>
                    <button 
                        onClick={e=> handleLogin(e)} 
                        className="bg-[#d4145a] cursor-pointer text-white py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300 w-1/2 self-center block mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
                <Link href="/auth/reset" className="text-[#d4145a] mt-4 block text-center hover:underline text-2xl">
                    Forgot Password?
                </Link>
        </div>
    )
}

export default Login;
