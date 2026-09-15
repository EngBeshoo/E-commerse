'use client'
import { Badge } from '@/components/ui/badge'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import  { useState } from 'react'
import { getWishlist } from '@/services/wishlist/wishlistService'
import { useQuery } from '@tanstack/react-query'
import { Root } from '@/type/cart-resp'

export default function Navbar() {
    const { data:cartData, isLoading, isError } =  useQuery<Root>({
      queryKey: ['cart'],
      queryFn: async () => {
        const resp = await fetch('/api/cart')
        const payload = await resp.json()
        return payload
      },
      
    })
 
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);


  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist-count'],
    queryFn: getWishlist,
    enabled: status === 'authenticated',
  })
  

  //  حساب الأرقام (لاحظ التغيير هنا)
  const cartCount = cartData?.numOfCartItems || 0
  const wishlistCount = wishlistData?.count || 0

     if(isLoading){
          return <p className="text-center py-8">Loading...</p>

    }
      if (isError) {
    return <p className="text-center py-8 text-red-500">Failed..</p>
  }
  function handleOpen() {
    setOpen(!open);
  }

  const path = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/brand', label: 'Brand' },
  ]

  const authpath = [
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Register' },
  ]

  return (
    <>
      <nav className="bg-white dark:bg-zinc-900 border-b border-border-gray dark:border-zinc-800 px-2 sm:px-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-10 items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-primary-blue dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
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
              {path.map((elem) => {
                const isActive = pathname === elem.href;
                return (
                  <li key={elem.href}>
                    <Link
                      href={elem.href}
                      className={`relative block py-2 px-3 rounded transition-all duration-300 md:p-0 ${isActive ? 'text-primary-blue dark:text-blue-400 font-semibold' : 'text-dark-text dark:text-white hover:text-primary-blue dark:hover:text-blue-400'}`}
                    >
                      {elem.label}
                      <span className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary-blue dark:bg-blue-400 transition-all duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border-gray rounded-lg bg-soft-gray md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-zinc-900 dark:border-zinc-800">
              


              {status === 'authenticated' ? (
                <>
                              <li className="relative flex items-center justify-center py-2 px-3 md:py-0 md:px-0">
                <Link href='/cart'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-dark-text dark:text-white hover:text-primary-blue dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </Link>
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 start-3 bg-red-600 text-white border-2 border-white dark:border-zinc-900 px-1.5 py-0.5 text-[10px] font-bold rounded-full">
                    {cartData?.numOfCartItems}
                  </Badge>
                )}
              </li>

              <li className="relative flex items-center justify-center py-2 px-3 md:py-0 md:px-0">
                <Link href='/wishlist'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-dark-text dark:text-white hover:text-primary-blue dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </Link>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 start-3 bg-red-600 text-white border-2 border-white dark:border-zinc-900 px-1.5 py-0.5 text-[10px] font-bold rounded-full">
                    {wishlistCount}
                  </Badge>
                )}
              </li>
                  <Link href='/profile'>
                    <li className="flex items-center justify-center py-2 px-3 md:py-0 md:px-0 text-primary-blue dark:text-blue-400 font-semibold">
                      Hey, {session?.user?.name} 👋
                    </li>
                  </Link>

                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className="flex items-center justify-center py-2 px-3 text-sm text-dark-text dark:text-white rounded hover:bg-light-blue dark:hover:bg-blue-500/20 md:hover:bg-transparent md:hover:text-red-500 md:p-0 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                      </svg>
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                authpath.map((elem) => {
                  const isActive = pathname === elem.href;
                  return (
                    <li key={elem.href}>
                      <Link
                        href={elem.href}
                        className={`relative block py-2 px-3 rounded transition-all duration-300 md:p-0 ${isActive ? 'text-primary-blue dark:text-blue-400 font-semibold' : 'text-dark-text dark:text-white hover:text-primary-blue dark:hover:text-blue-400'}`}
                      >
                        {elem.label}
                        <span className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary-blue dark:bg-blue-400 transition-all duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                      </Link>
                    </li>
                  )
                })
              )}
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}