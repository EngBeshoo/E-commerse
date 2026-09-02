'use client'
import { useState } from 'react'

export default function WishlistButton() {
    let [wishlist, setWishlist] = useState(false)

    function handleWishlist() {
        setWishlist(!wishlist)
    }

    return (
        <button 
            onClick={handleWishlist} 
            className={`px-4 border-2 rounded-lg font-medium transition-colors ${
                wishlist
                    ? 'bg-red-50 text-red-600 border-red-500 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/50 dark:hover:bg-red-500/20'
                    : 'border-primary-blue/40 text-primary-blue hover:bg-light-blue hover:text-primary-blue dark:border-blue-400/40 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300'
            }`}
        >
            ♥
        </button>
    )
}