'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function clearCart() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Please Login')
  }

  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      method: 'DELETE',
      headers: {
        token: session.accessToken,
        'Content-Type': 'application/json',
      },
    }
  )

  const payload = await resp.json()

  if (!resp.ok) {
    throw new Error(payload.message || 'Failed to clear cart')
  }

  return payload
}