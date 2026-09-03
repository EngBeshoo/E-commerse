import AddBtnCart from "@/app/_components/AddBtn/AddBtnCart"
import ProdImg from "@/app/_components/ProdImg/ProdImg"
import { ProdItem } from "@/type/productInterface"

type myProps={
    params:{
        id:string
    }
}

export default async function ProdDetails(props:myProps) {
  
 
    let {id} = await props.params
    let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    let {data:singleProd}:{data:ProdItem} = await response.json()
    console.log(singleProd)

  return <>
  <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl border-2 border-light-blue dark:border-blue-500/20 shadow-sm p-6">
                
                <div className="flex flex-col md:flex-row gap-8">
                   
                    <div className="w-full md:w-1/2">

                        <ProdImg images={singleProd.images}/>
                    </div>

                    <div className="w-full md:w-1/2">
                        <span className="inline-block bg-gray-300 text-black text-sm px-3 py-1 rounded-full mb-3">
                            {singleProd.brand?.name}
                        </span>
                        
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {singleProd.title}
                        </h1>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                <span>★★★★★</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({singleProd.ratingsAverage})
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-bold text-green-600 dark:text-blue-400">
                                ${singleProd.price}
                            </span>
                            {singleProd.priceAfterDiscount && (
                                <span className="text-xl text-red-500 line-through">
                                    ${singleProd.priceAfterDiscount}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {singleProd.description}
                        </p>

                        
                            <AddBtnCart productId={singleProd._id}/>
                        
                    </div>
                </div>

            </div>
        </div>
  </>
}
