'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function BrandCarousel({ brands }: { brands: any[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[autoplay.current]}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {brands.map((brand: any) => (
          <CarouselItem key={brand._id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div className="p-2">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-soft-gray dark:bg-zinc-800 hover:bg-light-blue dark:hover:bg-blue-500/10 transition-colors">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <span className="text-sm font-medium text-dark-text dark:text-white text-center">{brand.name}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}