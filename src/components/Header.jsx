'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '@/stateManagement/authSlice'
import Swal from 'sweetalert2'

function Header() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login' || pathname === '/auth/register'
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const handleLogout = ()=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You should login again if you want to take the test!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logoutThunk())
          Swal.fire({
            title: "Logged out!",
            text: "Logged out successfully.",
            icon: "success"
          });
        }
      });
  }

  if (isLoginPage) return null

  return (
    <div className='bg-white shadow-md bg-linear-to-tr from-[#d4145a] via-gray-800 to-red-900 flex justify-between items-center md:px-6'>
      <div className='flex items-center'>
        <h1 className='text-white font-bold text-lg p-4'>English level determination system</h1>
        <Link href="/documentation" className='px-5 text-white'>Documentation</Link>
      </div>
      {pathname === '/' ? (
        !mounted ? (
          <span className='px-5 text-white'>...</span>
        ) : isAuthenticated ? (
          <div className='felx gap-5 items-center justify-between'>
            <Link href="/dashboard" className='px-5 text-white'>Dashboard</Link>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 py-2 px-4 rounded text-white transition-colors mr-1'
          >
            Get started
          </Link>
        )
      ) : (
        <div className='felx gap-5 items-center justify-between'>
            <Link href="/" className='px-5 text-white'>Home</Link>
            <Link href="/dashboard" className='px-5 text-white'>Dashboard</Link>
            <button
              className='px-5 text-white cursor-pointer'
              onClick={handleLogout}
            >
                Logout
              </button>
          </div>
      )}
    </div>
  )
}

export default Header
