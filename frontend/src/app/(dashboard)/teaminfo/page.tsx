'use client'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface TeamMember {
  name: string
  role: string
  img?: string
  blurb?: string
}

const teamMembers: TeamMember[] = [
  { name: 'Vu Ngoc Chau', role: 'Project Manager' },
  { name: 'Shehryar Shaukat', role: 'Business Analyst' },
  { name: 'Andi Jagila', role: 'UX Designer' },
  { name: 'Lam Manh Tuan', role: 'Developer 1' },
  { name: 'Rishi Sood', role: 'Developer 2' },
]

export default function TeamInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Info</h1>
        <p className="mt-1 text-sm text-zinc-500">Here are your team members:</p>
      </div>
      <div className="flex flex-col gap-2 px-5">
        {teamMembers.map(({ name, role, img, blurb }) => (
          <div className="flex w-full flex-row gap-3" key={name}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="photoContainer flex w-10 shrink-0 items-start justify-center p-1">
                {img ? (
                  <img className="h-10 w-10" alt={name} src={img} />
                ) : (
                  <Skeleton circle width={40} height={40} containerClassName="flex-1" />
                )}
              </div>
              <div className="textContainer grow p-1">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-zinc-500">{role}</p>
                {blurb ? (
                  <p className="text-md w-full text-zinc-400">{blurb}</p>
                ) : (
                  <Skeleton width="full" count={5} containerClassName="flex-1" />
                )}
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </div>
    </div>
  )
}
