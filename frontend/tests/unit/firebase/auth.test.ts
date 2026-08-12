import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signInWithEmail } from '@/lib/firebase/auth'

const { signInWithEmailAndPassword, signOut } = vi.hoisted(() => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider: class {
    addScope = vi.fn()
  },
}))

vi.mock('@/lib/firebase/client', () => ({
  getClientAuth: vi.fn(() => ({})),
}))

describe('signInWithEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejects when Firebase reports invalid credentials', async () => {
    signInWithEmailAndPassword.mockRejectedValue(
      Object.assign(new Error('invalid credentials'), {code: 'auth/invalid-credential'})
    )

    await expect(signInWithEmail('user@example.com', 'wrong-password')).rejects.toThrow()
  })

  it('signs the user out and throws when the email is not verified', async () => {
    const user = {emailVerified: false, reload: vi.fn()}
    signInWithEmailAndPassword.mockResolvedValue({user})

    await expect(signInWithEmail('user@example.com', 'correct-password')).rejects.toThrow(
      'email-not-verified'
    )
    expect(signOut).toHaveBeenCalled()
  })

  it('resolves with the user when credentials are valid and verified', async () => {
    const user = {emailVerified: true, reload: vi.fn()}
    signInWithEmailAndPassword.mockResolvedValue({user})

    await expect(signInWithEmail('user@example.com', 'correct-password')).resolves.toBe(user)
  })
})
