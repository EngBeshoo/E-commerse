'use client'
import Link from 'next/link'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProdItem } from "@/type/productInterface"

export function ProdCard({prod}:{prod:ProdItem}) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  function handleWishlist() {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden border-2 border-light-blue dark:border-blue-500/20 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary-blue/50 transition-all duration-300 bg-white dark:bg-zinc-900">
      
      
      <Link href={`/prodDetails/${prod._id}`} className="block cursor-pointer">
        <div className="relative z-20 aspect-square overflow-hidden bg-soft-gray dark:bg-zinc-800">
          <img
            src={prod.imageCover}
            alt={prod.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <CardHeader className="px-5 pb-2 pt-4">
          
          <CardTitle className="text-sm font-medium bg-gray-300 w-fit px-2 py-0.5 text-center rounded-full text-black dark:text-gray-400 mb-1 truncate">
            {prod.brand.name}
          </CardTitle>
          
          <div className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-1 mb-2">
            {prod.title}
          </div>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-yellow-400 text-sm">
              <span>★★★★★</span> 
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({prod.ratingsAverage})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-700 dark:text-blue-400">
              ${prod.price}
            </span>
            {prod.price > 200 && (
              <span className="text-red-500 text-xl line-through">
                ${Math.round(prod.price * 1.2)}
              </span>
            )}
          </div>
        </CardHeader>
      </Link>

      
      <CardFooter className="px-5 pb-5 pt-0">
        <div className="flex w-full flex-col gap-3">
          <Button className="w-full bg-primary-blue hover:bg-blue-700 text-white rounded-lg font-medium text-sm py-2.5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleWishlist}
            className={`w-full rounded-lg font-medium text-sm py-2.5 transition-all duration-300 ${
              isWishlisted 
                ? "bg-red-50 text-red-600 border-red-500 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/50 dark:hover:bg-red-500/20" 
                : "border-primary-blue/40 text-primary-blue hover:bg-light-blue hover:text-primary-blue dark:border-blue-400/40 dark:text-blue-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill={isWishlisted ? "currentColor" : "none"} 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="size-4 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}