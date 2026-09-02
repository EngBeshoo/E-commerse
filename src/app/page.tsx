import { ProdItem } from "@/type/productInterface";
import { ProdCard } from "./_components/ProdCard/ProdCard";

export default async function Home() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
    method:"GET",
    cache:'no-store'
  }
  )
  let {data:allProd}:{data: ProdItem[]} = await response.json()
  
  return <>
  <div className="mt-5 gap-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {allProd.map((prod)=>{return <ProdCard key={prod._id} prod={prod}/>})}
  </div>

  </>;
}
