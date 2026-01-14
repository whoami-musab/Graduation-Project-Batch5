'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

function Header() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login' || pathname === '/auth/register'
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (isLoginPage) return null

  return (
    <div className='bg-white shadow-md bg-linear-to-tr from-[#d4145a] via-gray-800 to-red-900 flex justify-between items-center md:px-6'>
      <div className='flex items-center'>
        <h1 className='text-white font-bold text-lg p-4'>English level determination system</h1>
        <Link href="/documentation" className='px-5 text-white'>Documentation</Link>
      </div>

      {/* لا تعتمد على auth قبل mounted */}
      {pathname === '/' ? (
        !mounted ? (
          // Placeholder ثابت عشان السيرفر/الكلاينت يطابقوا
          <span className='px-5 text-white'>...</span>
        ) : isAuthenticated ? (
          <Link href="/dashboard" className='px-5 text-white'>Dashboard</Link>
        ) : (
          <Link
            href="/auth/login"
            className='bg-[#d4145a] hover:bg-linear-to-tl hover:from-red-800 hover:to-blue-900 py-2 px-4 rounded text-white transition-colors mr-1'
          >
            Get started
          </Link>
        )
      ) : (
        <Link href="/" className='px-5 text-white'>Home</Link>
      )}
    </div>
  )
}

export default Header
