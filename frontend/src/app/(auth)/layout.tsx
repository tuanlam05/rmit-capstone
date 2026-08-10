import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">{children}</div>
    </div>
  )
}
