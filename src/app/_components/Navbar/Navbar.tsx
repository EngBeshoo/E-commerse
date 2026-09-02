'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    let [open , setOpen] = useState(false)
    function handleOpen(){
        setOpen(!open)
    }
    const path = [
        {href: '/', label: 'Home'},
        {href: '/cart', label: 'Cart'},
        {href: '/products', label: 'Products'},
        {href: '/brand', label: 'Brand'},
    ]
    const authpath = [
        {href: '/login', label: 'Login'},
        {href: '/register', label: 'Register'},
    ]

  return <>
  
<nav className="bg-gray-200 dark:bg-zinc-900 border-b border-border-gray dark:border-zinc-800 px-2 sm:px-4  shadow-sm">
  <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-10 items-center justify-between mx-auto p-4">
    
  
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 m-0 text-primary-blue">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>

      <span className="self-center text-xl font-bold whitespace-nowrap text-dark-text dark:text-white">
        Fresh <span className="text-primary-blue dark:text-blue-400">Cart</span>
      </span>
    </Link>

 
    <button onClick={handleOpen} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark-text dark:text-white rounded-lg md:hidden hover:bg-light-blue dark:hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-primary-blue" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
    </button>

    <div className={`${!open && 'hidden'} w-full md:flex gap-10 justify-between`} id="navbar-default">
      
      
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border-gray rounded-lg bg-soft-gray md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-zinc-900 dark:border-zinc-800">
        {path.map((elem)=>{ return  <li key={elem.href}>
          <Link href={elem.href} className="block py-2 px-3 text-dark-text dark:text-white rounded hover:bg-light-blue dark:hover:bg-blue-500/20 md:hover:bg-transparent md:border-0 md:hover:text-primary-blue md:p-0 transition-colors duration-200">{elem.label}</Link>
        </li> })}
      </ul>

      
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border-gray rounded-lg bg-soft-gray md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-zinc-900 dark:border-zinc-800">
        {authpath.map((elem)=>{ return  <li key={elem.href}>
          <Link href={elem.href} className="block py-2 px-3 text-dark-text dark:text-white rounded hover:bg-light-blue dark:hover:bg-blue-500/20 md:hover:bg-transparent md:border-0 md:hover:text-primary-blue md:p-0 transition-colors duration-200">{elem.label}</Link>
        </li> })}
      </ul>
    </div>
  </div>
</nav>

  </>
}