'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function addProd(productId: string) {
    // ✅ اجيب التوكن من الـ Session مباشرة
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
        throw new Error('Please Login')
    }

    const resp = await fetch(`${process.env.API}/cart`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token: session.accessToken, // ✅ استخدم التوكن من الـ Session
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            productId
        })
    })

    const payload = await resp.json()
    console.log(payload)
    return payload
}