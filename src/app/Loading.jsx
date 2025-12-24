import React from 'react'

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-l-transparent border-[#d4145a] h-32 w-32 animate-spin"></div>
    </div>
  )
}

export default Loading
