'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCart, updateCartQty, removeFromCart, clearCart } from '@/services/cart/cartService'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function CartPage() {
    const queryClient = useQueryClient()
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart
    })

    const updateQtyMutation = useMutation({
        mutationFn: ({ productId, count }: { productId: string, count: number }) => updateCartQty(productId, count),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            queryClient.invalidateQueries({ queryKey: ['cart-count'] })
        }
    })

    const removeMutation = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            queryClient.invalidateQueries({ queryKey: ['cart-count'] })
            toast.success('Product removed from cart')
        }
    })

    const clearMutation = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            queryClient.invalidateQueries({ queryKey: ['cart-count'] })
            toast.success('Cart cleared')
        }
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Shopping Cart</h1>
                <div className="grid grid-cols-1 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="container mx-auto py-10 px-4 text-center">Error: {(error as Error).message}</div>
    }

    const cart = data?.data

    if (!cart || cart.products.length === 0) {
        return (
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Shopping Cart</h1>
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your cart is empty</p>
                    <Link href="/products">
                        <Button className="bg-primary-blue hover:bg-blue-700 text-white">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.products.map((item: any) => (
                        <div key={item.product._id} className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-light-blue dark:border-blue-500/20 shadow-sm">
                            <img src={item.product.imageCover} alt={item.product.title} width={100} height={100} className="rounded-lg object-cover" />
                            
                            <div className="flex-1">
                                <h3 className="font-semibold text-dark-text dark:text-white line-clamp-1">{item.product.title}</h3>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => updateQtyMutation.mutate({ productId: item.product._id, count: item.count - 1 })}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-dark-text dark:text-white"
                                >-</button>
                                <span className="w-8 text-center font-bold text-dark-text dark:text-white">{item.count}</span>
                                <button 
                                    onClick={() => updateQtyMutation.mutate({ productId: item.product._id, count: item.count + 1 })}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-dark-text dark:text-white"
                                >+</button>
                            </div>
                            
                            <div className="text-right">
                                <p className="font-bold text-primary-blue dark:text-blue-400">${item.price * item.count}</p>
                                <button 
                                    onClick={() => removeMutation.mutate(item.product._id)}
                                    className="text-red-500 text-sm hover:text-red-700 mt-1"
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Summary */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-light-blue dark:border-blue-500/20 shadow-sm h-fit">
                    <h2 className="text-xl font-bold text-dark-text dark:text-white mb-4">Order Summary</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Total Price: <span className="font-bold text-primary-blue dark:text-blue-400">${cart.totalCartPrice}</span></p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Total Items: <span className="font-bold">{cart.numOfCartItems}</span></p>
                    
                    <Button className="w-full bg-primary-blue hover:bg-blue-700 text-white mb-2">Checkout</Button>
                    <button 
                        onClick={() => clearMutation.mutate()}
                        className="w-full text-red-500 text-sm hover:text-red-700 py-2"
                    >Clear Cart</button>
                </div>
            </div>
        </div>
    )
}