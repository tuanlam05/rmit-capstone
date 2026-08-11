'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/teaminfo')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/teaminfo')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
      } else {
        const errorMsg = 'Invalid email or password.'
        // toast.error('')

        setError('form', {
          message: errorMsg,
        })

        setError('email', {
          message: errorMsg,
        })

        setError('password', {
          message: errorMsg,
        })
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/teaminfo')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="flex w-full flex-row">
      <div className="bg-foreground relative h-screen w-[45%]">
        <div className="absolute top-10 left-10 flex flex-row items-center gap-4">
          <div className="bg-background flex h-10 w-10 items-center justify-center rounded-lg p-3 text-zinc-900 dark:text-white">
            23
          </div>
          <h1 className="text-background text-lg font-bold">Team 23</h1>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-center gap-3 px-30">
          <h1 className="text-background text-left text-4xl font-bold">
            Telstra Health-UX Research Companion — Team 1
          </h1>
          <p className="text-left text-2xl text-zinc-500">
            Team info, notes and settings for the capstone project.
          </p>
        </div>
      </div>
      <div className="bg-background flex h-screen w-[55%] flex-col justify-center space-y-6 px-45 py-30">
        <div className="space-y-1 text-center">
          <h1 className="text-foreground text-left text-2xl font-bold tracking-tight">Sign in</h1>
          <p className="text-left text-sm text-zinc-500">Enter your credentials to continue</p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="transition flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 px-2 text-zinc-400 dark:bg-zinc-950">or</span>
          </div>
        </div>

        {errors.form && (
          <div className="rounded-md border border-[#FECACA] bg-[#FEF2F2] py-2 px-5 h-10.5 flex justify-start items-center">
            <p className="text-dark-error text-sm font-geist">{errors.form.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="transition focus-visible:ring-dark-theme w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 aria-invalid:border-error-red aria-invalid:focus-visible:ring-error-red dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="me@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-error-red" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className="transition focus-visible:ring-dark-theme w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 aria-invalid:border-error-red aria-invalid:focus-visible:ring-error-red dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p id="password-error" className="text-xs text-error-red" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-theme cursor-pointer font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
