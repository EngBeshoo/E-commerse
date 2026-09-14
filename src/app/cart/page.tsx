'use client'
import { updateCartQty } from '@/services/cart/cartService'
import { removeFromCart } from '@/services/cart/DeleteCart'
import { CartItem } from '@/type/cart-resp'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'

export  default function Cart() {
      const queryClient = useQueryClient()

  const { data:cartData, isLoading, isError } =  useQuery<CartItem>({
    queryKey: ['cart'],
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    },
  })
  //delete
 const { mutate: delCartItem, isPending } = useMutation({
  mutationFn: async (productId: string) => {
    const session = await getSession()

    if (!session?.accessToken) {
      throw new Error("Please Login")
    }

    return removeFromCart(productId, session.accessToken)
  },

  onSuccess: () => {
    toast.success("Remove success")
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  },

  onError: (error) => {
    toast.error(error.message)
  },
})
const { mutate: updateCartItem } = useMutation({
  mutationFn: async ({
    productId,
    count,
  }: {
    productId: string
    count: number
  }) => {
    const session = await getSession()

    if (!session?.accessToken) {
      throw new Error("Please Login")
    }

    return updateCartQty(productId, count, session.accessToken)
  },

  onSuccess: () => {
    toast.success("Update success")
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  },

  onError: (error) => {
    toast.error(error.message)
  },
})

  if (isLoading) {
    return <p className="text-center py-8">Loading cart...</p>
  }

  if (isError) {
    return <p className="text-center py-8 text-red-500">Failed to load cart.</p>
  }
  console.log("cartData ",cartData)

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm border rounded border-primary text-left rtl:text-right text-body">
        <thead className="text-sm bg-primary-blue text-white bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
<tbody>
  {cartData?.data.products.map((item) => (
    <tr
      key={item._id}
      className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
    >
      <td className="p-4">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-16 md:w-24 max-w-full max-h-full rounded-base"
        />
      </td>

      <td className="px-6 py-4 font-semibold text-heading">
        {item.product.title}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">

  <button
    onClick={() => {
      updateCartItem({
        productId: item.product._id,
        count: item.count - 1,
      })
    }}
    className="px-2 py-1 border rounded"
  >
    -
  </button>

  <span>{item.count}</span>

  <button
    onClick={() => {
      updateCartItem({
        productId: item.product._id,
        count: item.count + 1,
      })
    }}
    className="px-2 py-1 border rounded"
  >
    +
  </button>

</div>
      </td>

      <td className="px-6 py-4 font-semibold text-heading">
        ${item.price} EGP
      </td>

      <td className="px-6 py-4">
        <span onClick={()=>{delCartItem(item.product._id)}} className="text-red-500 hover:underline">
          Remove
        </span>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  )
}