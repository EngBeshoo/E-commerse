import { ProdItem } from "@/type/productInterface";
import { ProdCard } from "./_components/ProdCard/ProdCard";
import  BrandCarousel  from "./_components/BrandCarousel/BrandCarousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    method: "GET",
    cache: 'no-store'
  });
  let { data: allProd }: { data: ProdItem[] } = await response.json();

  let categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  let { data: categories }: { data: any[] } = await categoryResponse.json();

  let brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  let { data: brands }: { data: any[] } = await brandResponse.json();

  return (
    <>
      <section className="relative bg-light-blue dark:bg-zinc-900 border-b border-border-gray dark:border-zinc-800">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-primary-blue text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
                NEW COLLECTION 2024
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-text dark:text-white mb-4">
                Elevate Your Everyday <span className="text-primary-blue">Accessories</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Premium accessories designed for work, travel and lifestyle.
              </p>
              <div className="flex gap-4">
                <Button className="bg-primary-blue hover:bg-blue-700 text-white">
                  Shop Collection →
                </Button>
                <Button variant="outline" className="border-primary-blue text-primary-blue hover:bg-light-blue">
                  Explore Deals
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                alt="Accessories"
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Brand Carousel ============ */}
      <section className="py-8 bg-white dark:bg-zinc-900 border-b border-border-gray dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-dark-text dark:text-white mb-6">Shop by Brand</h2>
          <BrandCarousel brands={brands} />
        </div>
      </section>

      {/* ============ Shop by Category ============ */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-text dark:text-white">Shop by Category</h2>
            <Link href="/products" className="text-primary-blue hover:underline">View All Categories →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat: any) => (
              <Link href={`/products?category=${cat._id}`} key={cat._id} className="flex flex-col items-center p-4 rounded-xl bg-soft-gray dark:bg-zinc-800 hover:bg-light-blue dark:hover:bg-blue-500/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-700 flex items-center justify-center mb-2">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-sm font-medium text-dark-text dark:text-white text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Featured Products ============ */}
      <section className="py-12 bg-soft-gray dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-text dark:text-white">Featured Products</h2>
            <Link href="/products" className="text-primary-blue hover:underline">View All Products →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProd.slice(0, 4).map((prod) => (
              <ProdCard key={prod._id} prod={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ New Arrivals ============ */}
      <section className="py-12 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark-text dark:text-white">New Arrivals</h2>
            <Link href="/products" className="text-primary-blue hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProd.slice(8, 12).map((prod) => (
              <ProdCard key={prod._id} prod={prod} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}