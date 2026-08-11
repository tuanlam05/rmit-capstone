'use client'

import Link from 'next/link'
import { LayoutDashboard, StickyNote, User, Settings, Users2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/teaminfo', label: 'Team Info', icon: Users2 },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-60 flex-col border-r border-zinc-200 bg-white lg:flex dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-3 px-4 pt-2">
        <div className="bg-foreground text-background flex h-8 w-8 items-center justify-center rounded-lg text-sm">
          23
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="text-foreground font-semibold">Team 23</h1>
          <p className="text-xs text-zinc-500">Telstra Health-UX Research Companion - Team 1</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const selected = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors dark:text-zinc-400',
                selected
                  ? 'text-[#18181B] dark:text-[#fafafa] border border-[#E4E4E7] dark:bg-[#27272A] dark:border-[#3F3F46] shadow-lg'
                  : 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white text-[#52525B] dark:text-[#A1A1AA]'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
