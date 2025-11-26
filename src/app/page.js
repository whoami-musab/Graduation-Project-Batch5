'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";



export default function Home() {
  const bgImg = '/imgs/login.png';
  const router = useRouter()

  return (
    <div
        className="background-image pb-5 min-h-screen"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <div className="container mx-auto text-white flex flex-col justify-center items-center px-5">
          {/* ========================================================================== */}
          <div className="flex flex-col mt-5 bg-gray-950 p-10 rounded-lg gap-10">
            <div className="text-4xl font-bold">
              <h1 className="text-4xl font-bold mb-4">Welcome to our Graduation Project</h1>
              <p className="text-lg">English Level Determination System</p>
            </div>
            <button 
              className="mt-6 bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors cursor-pointer w-1/2 md:w-1/4"
              onClick={() => router.push('/auth/login')}
              >
              Get Started
            </button>
            <div className="links border border-[#d4145a] p-3 rounded-lg">
              <div className="flex gap-8">
                <Link
                  href={'https://github.com/whoami-musab/Graduation-Project-Batch5'}
                  target="_blank"
                  className="flex items-center hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 p-1 rounded-full transition-colors"
                >
                  <FaGithub className="text-3xl" />
                </Link>
                <Link
                  href={'https://github.com/whoami-musab/Graduation-Project-Batch5'}
                  target="_blank"
                  className="flex items-center hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 p-1 rounded-full transition-colors"
                >
                  <TbWorld className="text-3xl" />
                </Link>
              </div>
            </div>
          </div>
          {/* ========================================================================== */}          
        </div>
    </div>
  );
}
