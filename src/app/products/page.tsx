'use client'
import { useQuery } from '@tanstack/react-query'
import { ProdCard } from '@/app/_components/ProdCard/ProdCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'

async function getProducts(category?: string) {
  const url = category
    ? `https://ecommerce.routemisr.com/api/v1/products?category=${category}`
    : `https://ecommerce.routemisr.com/api/v1/products`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

async function getCategories() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
  const data = await response.json()
  return data
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const { data: productsData, isLoading, isFetching, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getProducts(selectedCategory)
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-red-500 text-lg">Error fetching products</p>
      </div>
    )
  }

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Products</h1>
        <div className="mb-8 flex flex-wrap gap-3">
          <Skeleton className="h-10 w-20 rounded-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-primary-blue dark:text-white mb-8">Products</h1>
      
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === '' 
              ? 'bg-primary-blue text-white' 
              : 'bg-soft-gray dark:bg-zinc-800 text-dark-text dark:text-white hover:bg-light-blue'
          }`}
        >
          All
        </button>
        {categoriesData?.data?.map((cat: any) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat._id 
                ? 'bg-primary-blue text-white' 
                : 'bg-soft-gray dark:bg-zinc-800 text-dark-text dark:text-white hover:bg-light-blue'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData?.data?.map((prod: any) => (
          <ProdCard key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  )
}