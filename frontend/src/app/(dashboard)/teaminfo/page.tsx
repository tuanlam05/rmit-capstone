'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import Image from 'next/image'

interface TeamMember {
  name: string
  role?: string
  img?: string
  blurb?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Vu Ngoc Chau',
    role: 'Project Manager',
    img: '/teaminfo/chau.jpg',
    blurb:
      "Hello, I'm Chau, a third-year Bachelor of IT student majoring in Digital Innovation. I'm particularly interested in project management and enjoy coordinating teams, solving problems, and keeping projects on track to deliver successful outcomes.",
  },
  {
    name: 'Shehryar Shaukat',
    role: 'Business Analyst',
    img: '/teaminfo/shehryar.jpg',
    blurb:
      "Hi, I'm Shehryar, a final-year Computer Science student with expertise in software development, data analytics, and business analysis. I'm interested in AI, user-focused solutions, and turning requirements into real products.",
  },
  {
    name: 'Andi Jagila',
    role: 'UX Designer',
    img: '/teaminfo/andi.jpg',
    blurb:
      "Hi! I'm Andi, a final-year IT student working on the UX side of the project. I focus on creating clear, intuitive, and user-friendly experiences that make the product easy and enjoyable to use.",
  },
  {
    name: 'Lam Manh Tuan',
    role: 'Developer 1',
    img: '/teaminfo/nick.jpg',
    blurb:
      "Hey! I'm Tuan, a third-year RMIT student majoring in Artificial Intelligence. I'm one of the developers on this team, and hopefully, I'll be able to contribute my full-stack experience to the project!",
  },
  {
    name: 'Rishi Sood',
    role: 'Developer 2',
    img: '/teaminfo/rishi.jpg',
    blurb:
      "Hi there! I'm Rishi, an RMIT Computer Science student majoring in Cybersecurity and one of the project's two developers. I focus on building the AI companion's functionality and bringing a security-minded eye to how it's all put together.",
  },
]

function getInitials(name: string) {
  const words = name.trim().split(/\s+/)

  if (!words[0]) return ''

  return `${words[0][0]}${words.at(-1)?.[0] ?? ''}`.toUpperCase()
}

function TeamMemberCard({ name, role, img, blurb }: TeamMember) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="h-122.5 w-73.75 perspective-[1000px]" key={name}>
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 transform-3d',
          flipped && 'transform-[rotateY(180deg)]'
        )}
      >
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-start rounded-md border border-[#E4E4E7] px-5 backface-hidden dark:border-[#27272A] dark:bg-[#18181B]">
          <div className="photoContainer my-5 flex h-65 w-65">
            {img ? (
              <Image
                className="rounded-lg object-cover"
                alt={name}
                src={img}
                width={260}
                height={260}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-[#F4F4F5] text-lg text-[34px] text-zinc-500 uppercase dark:bg-[#27272a]">
                {getInitials(name)}
              </div>
            )}
          </div>
          <div className="textContainer flex w-full min-w-0 flex-1 flex-col items-start gap-2 p-1">
            <p className="w-full text-lg font-semibold">{name}</p>
            <div
              className={cn(
                '-ml-1 flex h-6.5 items-center justify-center rounded-full border bg-[#F4F4F5] p-3 text-center text-xs',
                role
                  ? 'border-[#E4E4E7] text-[#3F3F46] dark:border-0 dark:bg-[#27272A] dark:text-[#D4D4D8]'
                  : 'border-dashed border-[#D4D4D8] text-[#A1A1AA] dark:border-[#3F3F46] dark:bg-[#09090B]'
              )}
            >
              {role || 'Role TBC'}
            </div>
            {blurb && (
              <div className="mb-5 flex w-full flex-1 flex-col justify-between">
                <p className="text-md line-clamp-3 flex-1 text-[#71717A] dark:text-[#A1A1AA]">
                  &quot;{blurb}&quot;
                </p>
                <button
                  className="text-theme w-fit cursor-pointer text-sm hover:underline"
                  onClick={() => setFlipped(true)}
                >
                  View full
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 flex h-full w-full transform-[rotateY(180deg)] flex-col items-center justify-start rounded-md border border-[#E4E4E7] px-5 backface-hidden dark:border-[#27272A] dark:bg-[#18181B]">
          <div className="my-5 flex h-full min-h-0 w-full flex-col items-start justify-start gap-1">
            <p className="mb-2 text-lg font-semibold">{name}</p>

            <div
              className={cn(
                '-ml-1 flex h-6.5 items-center justify-center rounded-full border bg-[#F4F4F5] p-3 text-center text-xs',
                role
                  ? 'border-[#E4E4E7] text-[#3F3F46] dark:border-0 dark:bg-[#27272A] dark:text-[#D4D4D8]'
                  : 'border-dashed border-[#D4D4D8] text-[#A1A1AA] dark:border-[#3F3F46] dark:bg-[#09090B]'
              )}
            >
              {role || 'Role TBC'}
            </div>

            <div className="mt-2 min-h-0 flex-1 overflow-y-scroll">
              <p className="text-md flex-1 leading-relaxed text-[#71717A] dark:text-[#A1A1AA]">
                &quot;{blurb}&quot;
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="text-theme mt-4 w-fit cursor-pointer text-sm hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamInfo() {
  return (
    <div className="space-y-6 bg-[#FAFAFA] dark:bg-[#09090B]">
      <div className="relative">
        <h1 className="text-2xl font-bold tracking-tight">Team 23</h1>
        <p className="mt-1 text-sm text-zinc-500">
          The people behind Telstra Health - UX Research Companion
        </p>
        <div className="text-foreground absolute top-1 right-5 flex h-6.5 w-22.5 items-center justify-center rounded-full border border-[#E4E4E7] bg-[#F4F4F5] text-center text-xs dark:border-[#3F3F46] dark:bg-[#18181B]">
          {teamMembers.length} members
        </div>
      </div>
      <div className="flex flex-wrap gap-10 px-5">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  )
}
