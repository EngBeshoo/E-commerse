'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

async function getToken() {
    const session = await getServerSession(authOptions)
    return session?.accessToken
}

//  GET Wishlist (بيجيب الـ IDs)
export async function getWishlist() {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/wishlist`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            token: token,
            'Content-type': 'application/json'
        }
    })
    const payload = await resp.json()
    console.log("Wishlist API Response:", payload)
    return payload
}

// ✅ POST (Add to Wishlist)
export async function addToWishlist(productId: string) {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/wishlist`, {
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
    console.log("Add to Wishlist Response:", payload)
    return payload
}

// ✅ DELETE (Remove from Wishlist)
export async function removeFromWishlist(productId: string) {
    const token = await getToken()
    if (!token) throw new Error('Please Login')
    
    const resp = await fetch(`${process.env.API}/wishlist/${productId}`, {
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