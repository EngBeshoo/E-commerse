'use client'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProdItem } from "@/type/productInterface"
import AddBtnCart from '../AddBtn/AddBtnCart'

export function ProdCard({prod}:{prod:ProdItem}) {
  
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
      <AddBtnCart productId={prod._id}/>
    </Card>
  )
}