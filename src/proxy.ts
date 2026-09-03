import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const protectedPages = ['/cart', '/wishlist', '/profile']
const publicPages = ['/','/login', '/register']

const publicPrefixes = ['/products', '/prodDetails']

export default async function proxy(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    const pathname = req.nextUrl.pathname

    if (publicPrefixes.some(prefix => pathname.startsWith(prefix))) {
        return NextResponse.next()
    }

    if (protectedPages.includes(pathname)) {
        if (!token) {
            const redirectUrl = new URL('/login', process.env.NEXTAUTH_URL)
            redirectUrl.searchParams.set('error', 'You must be logged in to access this page')
            return NextResponse.redirect(redirectUrl)
        }
        return NextResponse.next()
    }

    if ((pathname === '/login' || pathname === '/register') && token) {
        const redirectUrl = new URL('/', process.env.NEXTAUTH_URL)
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}