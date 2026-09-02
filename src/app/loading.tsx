import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden border-2 border-light-blue dark:border-blue-500/20 rounded-2xl shadow-sm bg-white dark:bg-zinc-900">
      <div className="relative z-20 aspect-square overflow-hidden bg-soft-gray dark:bg-zinc-800">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <CardHeader className="px-5 pb-2 pt-4">
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-5 w-4/5 mb-2" />
        <div className="flex items-center gap-1 mb-3">
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-24" />
      </CardHeader>

      <CardFooter className="px-5 pb-5 pt-0">
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-10 w-full rounded-lg bg-primary-blue/20" />
          <Skeleton className="h-10 w-full rounded-lg bg-primary-blue/10" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  )
}