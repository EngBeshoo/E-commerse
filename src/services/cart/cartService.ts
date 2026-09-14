'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

async function getToken() {
    const session = await getServerSession(authOptions)
    return session?.accessToken
}
export async function getCart() {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            token: token,
            'Content-type': 'application/json'
        }
    })
    const payload = await resp.json()
    return payload
}

export async function addToCart(productId: string) {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            productId
        })
    })
    const payload = await resp.json()
    return payload
}

export async function updateCartQty(
  productId: string,
  count: number,
  token: string
) {
  const resp = await fetch(
    `${process.env.API}/cart/${productId}`,
    {
      method: 'PUT',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        count,
      }),
    }
  )

  const payload = await resp.json()

  if (!resp.ok) {
    throw new Error(
      payload.message || 'Failed to update cart'
    )
  }

  return payload
}

export async function removeFromCart(productId: string) {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/cart/${productId}`, {
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            token: token,
            'Content-type': 'application/json'
        }
    })
    const payload = await resp.json()
    return payload
}

export async function clearCart() {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            token: token,
            'Content-type': 'application/json'
        }
    })
    const payload = await resp.json()
    return payload
}