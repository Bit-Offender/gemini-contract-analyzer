import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
        <nav className='sticky border-b-[1.5px] border-gray-700 top-0 flex justify-between items-center py-4 px-4 bg-gray-950/80 backdrop-blur-md z-50'>
            <Link href='/' className='text-lg'>AppName</Link>
            <div className='flex gap-5 items-center justify-between'>
                <Link href='/' className='text-white/80 hover:text-white relative group transition-colors'>
                    Features
                    <span className='absolute left-0 bg-blue-600 bottom-0 w-0 h-0.5 group-hover:w-full transition-all duration-300' />
                </Link>
                <Link href='/' className='text-white/80 hover:text-white relative group transition-colors'>
                    How It Works
                    <span className='absolute left-0 bg-blue-600 bottom-0 w-0 h-0.5 group-hover:w-full transition-all duration-300' />
                </Link>
            </div>
            <div className='flex items-center gap-5 justify-around pr-5'>
                <Link href='/about' className='text-white/80 hover:text-white relative group transition-colors'>
                    About
                    <span className='absolute left-0 bg-blue-600 bottom-0 w-0 h-0.5 group-hover:w-full transition-all duration-300' />
                </Link>
                <Link href='/contact' className='text-white/80 hover:text-white relative group transition-colors'>
                    Contact Us
                    <span className='absolute left-0 bg-blue-600 bottom-0 w-0 h-0.5 group-hover:w-full transition-all duration-300' />
                </Link>
            </div>
        </nav>
    </>
  )
}

export default Header