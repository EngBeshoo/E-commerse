'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function ProfileContent({ user }: { user: any }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Profile</h1>
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-light-blue dark:border-blue-500/20 shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-soft-gray dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name || 'User'} className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-primary-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-dark-text dark:text-white mb-1">
              {user.name || 'User'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {user.email || 'No email'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cart">
                <Button className="bg-primary-blue hover:bg-blue-700 text-white">
                  My Cart
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="outline" className="border-primary-blue text-primary-blue hover:bg-light-blue">
                  My Wishlist
                </Button>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 rounded-lg font-medium text-sm text-red-500 border-2 border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}