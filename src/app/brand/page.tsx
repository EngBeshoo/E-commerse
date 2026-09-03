import React from 'react'
import BrandCarousel from '@/app/_components/BrandCarousel/BrandCarousel'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Brand() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const allBrands = data.data

  if (!allBrands) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Brands</h1>
      
      <div className="mb-12">
        <BrandCarousel brands={allBrands} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allBrands.map((brand: any) => (
          <Link 
            href={`/products?brand=${brand._id}`} 
            key={brand._id} 
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-zinc-900 border border-light-blue dark:border-blue-500/20 shadow-sm hover:shadow-lg hover:border-primary-blue/50 transition-all duration-300"
          >
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-24 h-24 object-contain mb-3"
            />
            <span className="text-lg font-bold text-dark-text dark:text-white text-center">
              {brand.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {brand.slug}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}