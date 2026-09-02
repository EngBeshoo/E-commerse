'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function ProdImg({images}:{images:string[]}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
      className="w-full max-w-[10rem] sm:max-w-xs"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-full">
            <img 
              src={src} 
              alt={src} 
              className="w-full aspect-square object-cover rounded-xl "
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4  top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  )
}