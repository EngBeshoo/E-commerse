'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function addProd(productId: string) {

    const session = await getServerSession(authOptions)

    console.log("SESSION:", session)

    if (!session?.accessToken) {
        throw new Error('Please Login')
    }

    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        cache: 'no-store',
        method: 'POST',

        headers: {
            token: session.accessToken,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            productId
        })
    })

    const payload = await resp.json()

    console.log("CART RESPONSE:", payload)

    return payload
}