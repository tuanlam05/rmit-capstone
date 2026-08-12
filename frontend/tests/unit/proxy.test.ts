import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { proxy } from '@/proxy'

describe('proxy', () => {
    it('redirects to /auth/signin when visiting a protected route without a session cookie', () => {
        const response = proxy(new NextRequest(new URL('/teaminfo', 'http://localhost:3000')))

        const location = new URL(response.headers.get('location')!)
        expect(location.pathname).toBe('/auth/signin')
        expect(location.searchParams.get('redirect')).toBe('/teaminfo')
    })

    it('lets a protected route through when a session cookie is present', () => {
        const response = proxy(new NextRequest(new URL('/teaminfo', 'http://localhost:3000'), {
            headers: { cookie: '__session=valid-session-token' },
        }))

        expect(response.headers.get('location')).toBeNull()
        expect(response.headers.get('x-middleware-next')).toBe('1')
    })

    it('redirects an authenticated user away from /auth/signin', () => {
        const response = proxy(new NextRequest(new URL('/auth/signin', 'http://localhost:3000'), {
            headers: { cookie: '__session=valid-session-token' },
        }))

        expect(new URL(response.headers.get('location')!).pathname).toBe('/teaminfo')
    })

    it('lets an unauthenticated user reach /auth/signin', () => {
        const response = proxy(new NextRequest(new URL('/auth/signin', 'http://localhost:3000')))

        expect(response.headers.get('location')).toBeNull()
    })
})
