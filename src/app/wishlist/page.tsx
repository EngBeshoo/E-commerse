'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWishlist, removeFromWishlist } from '@/services/wishlist/wishlistService'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ProdCard } from '@/app/_components/ProdCard/ProdCard'

export default function WishlistPage() {
    const queryClient = useQueryClient()
    
    //  جلب المنتجات مباشرة من الـ API
    const { data, isLoading, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: getWishlist
    })

    //  الـ data هي مصفوفة من المنتجات الكاملة
    const wishlist = data?.data || []

    const removeMutation = useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
            toast.success('Removed from wishlist')
        }
    })

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Wishlist</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-80 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="container mx-auto py-10 px-4 text-center">Error: {(error as Error).message}</div>
    }

    if (!wishlist || wishlist.length === 0) {
        return (
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Wishlist</h1>
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Your wishlist is empty</p>
                    <Link href="/products">
                        <Button className="bg-primary-blue hover:bg-blue-700 text-white">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Wishlist</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((item: any) => (
                    <div key={item._id} className="relative">
                        <ProdCard prod={item} />
                        <button 
                            onClick={() => removeMutation.mutate(item._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-30"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}