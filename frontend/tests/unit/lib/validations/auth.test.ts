import { describe, it, expect } from 'vitest'
import { loginSchema } from '@/lib/validations/auth'

describe('loginSchema', () => {
  it('rejects a malformed email', () => {
    const result = loginSchema.safeParse({email: 'not-an-email', password: 'whatever'})
    expect(result.success).toBe(false)
  })

  it('rejects an empty password', () => {
    const result = loginSchema.safeParse({email: 'user@example.com', password: ''})
    expect(result.success).toBe(false)
  })

  it('accepts a well-formed login', () => {
    const result = loginSchema.safeParse({email: 'user@example.com', password: 'anything'})
    expect(result.success).toBe(true)
  })
})