'use client'
import { CardFooter } from '@/components/ui/card'
import { addProd } from '@/services/cart/addToCart'
import { addToWishlist, removeFromWishlist } from '@/services/wishlist/wishlistService'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddBtnCart({productId}:{productId:string}) {
  const queryClient = useQueryClient()
  const [isWishlisted, setIsWishlisted] = useState(false)

  //  Mutation للـ Cart
  const cartMutation = useMutation({
    mutationFn: addProd,
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to Cart')
      // تحديث عداد السلة فوراً
      queryClient.invalidateQueries({ queryKey: ['cart-count'] })
    },
    onError: () => {
      toast.error('Login first please')
    }
  })

  //  Mutation للـ Wishlist (إضافة وحذف)
  const wishlistMutation = useMutation({
    mutationFn: ({ action, productId }: { action: 'add' | 'remove', productId: string }) => {
      return action === 'add' ? addToWishlist(productId) : removeFromWishlist(productId)
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Wishlist updated')
      // تحديث عداد المفضلة فوراً
      queryClient.invalidateQueries({ queryKey: ['wishlist-count'] })
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
    onError: () => {
      toast.error('Login first please')
    }
  })

  function handleAddToCart() {
    cartMutation.mutate(productId)
  }

  function handleWishlist() {
    if (isWishlisted) {
      // حذف من المفضلة
      wishlistMutation.mutate({ action: 'remove', productId })
    } else {
      // إضافة للمفضلة
      wishlistMutation.mutate({ action: 'add', productId })
    }
    setIsWishlisted(!isWishlisted)
  }

  return (
      <CardFooter className="px-5 pb-5 pt-0">
        <div className="flex w-full text-center flex-col gap-3">
          <Button 
            onClick={handleAddToCart}
            disabled={cartMutation.isPending}
            className="w-full text-md justify-center flex gap-3 text-center mx-auto bg-primary-blue hover:bg-blue-700 text-white rounded-lg font-medium py-2.5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartMutation.isPending ? 'Adding...' : 'Add to Cart'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleWishlist}
            disabled={wishlistMutation.isPending}
            className={`w-full rounded-lg font-medium text-md justify-center flex gap-3 py-2.5 transition-all duration-300 ${
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
              className="size-5 mt-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
        </div>
      </CardFooter>
  )
}