'use client'
import { updateCartQty } from '@/services/cart/cartService'
import { removeFromCart } from '@/services/cart/DeleteCart'
import type { Root } from '@/type/cart-resp'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { clearCart } from '@/services/cart/ClearCart'
import { Button } from '@/components/ui/button'

export default function Cart() {
  const queryClient = useQueryClient()

  const { data: cartData, isLoading, isError } = useQuery<Root>({
    queryKey: ['cart'],
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    },
  })

  const { mutate: delCartItem, isPending } = useMutation({
    mutationFn: async (productId: string) => {
      const session = await getSession()

      if (!session?.accessToken) {
        throw new Error("Please Login")
      }

      return removeFromCart(productId, session.accessToken)
    },
    onSuccess: () => {
      toast.success("Remove success")
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: updateCartItem } = useMutation({
    mutationFn: async ({
      productId,
      count,
    }: {
      productId: string
      count: number
    }) => {
      const session = await getSession()

      if (!session?.accessToken) {
        throw new Error("Please Login")
      }

      return updateCartQty(productId, count, session.accessToken)
    },
    onSuccess: () => {
      toast.success("Update success")
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })


  const { mutate: removeAllCart ,isPending: isClearing  } = useMutation({
    mutationFn: ()=>clearCart(),
    onSuccess: () => {
      toast.success(" cart delete  ")
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      queryClient.invalidateQueries({ queryKey: ["cart-count"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">
          Shopping Cart
        </h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 w-full bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-red-500 text-lg">Failed to load cart.</p>
      </div>
    )
  }

  const cart = cartData?.data
  const products = cart?.products || []

  if (products.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">
          Shopping Cart
        </h1>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            Your cart is empty
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const totalItems = products.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-primary-blue text-white text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium text-center">Qty</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {products.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 dark:border-zinc-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">
                            {item.product.title}
                          </h3>
                          
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateCartItem({
                              productId: item.product._id,
                              count: item.count - 1,
                            })
                          }
                          disabled={item.count <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-white font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 dark:text-white">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem({
                              productId: item.product._id,
                              count: item.count + 1,
                            })
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-primary-blue dark:text-blue-400">
                        ${item.price * item.count}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ${item.price} each
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => delCartItem(item.product._id)}
                        disabled={isPending}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-full transition-colors disabled:opacity-50"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-start">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary-blue dark:text-blue-400 hover:text-blue-700 font-medium transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Total Items
                </span>
                <span className="font-bold text-gray-800 dark:text-white">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>
                <span className="font-bold text-gray-800 dark:text-white">
                  ${cart?.totalCartPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Shipping
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary-blue dark:text-blue-400">
                    ${cart?.totalCartPrice}
                  </span>
                </div>
              </div>
            </div>


            <Button className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              Proceed to Checkout
            </Button>
                        <Button onClick={()=>{removeAllCart()}} className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2">
                            <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
              
              Clear Cart
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}