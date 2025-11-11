'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'


const Navbar = () => {
    const [isOpen , setIsOpen]= useState(false)
    console.log(isOpen)
  return (
    <> 
    <nav className="max-w-5xl mx-auto flex justify-between items-center py-4 px-4">
        
   <Link href="/" className="btn btn-ghost text-xl" >
             <Image src="/images/logo.svg" alt="logo" width={180} height={180}></Image>
            </Link>

           
            <div className=" hidden md:flex space-x-6 text-gray-600">
              <Link href="/">Accueil</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/contact">Contact</Link>
              
            </div>
                      <div className='md:hidden ' onClick={()=> setIsOpen(!isOpen)}> {isOpen ? "X": "="}</div>

          </nav>
            {isOpen  &&(
                <div className=' flex  justify-center items-center flex-col bg-red-500'>
                <Link href="/">Accueil</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/contact">Contact</Link>
                </div>
            )}
            </>

  )
}

export default Navbar