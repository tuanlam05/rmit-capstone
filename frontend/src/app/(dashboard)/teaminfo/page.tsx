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
  {
    name: 'Vu Ngoc Chau',
    role: 'Project Manager',
    img: '/teaminfo/chau.jpg',
    blurb:
      'Hello, I’m Chau, a third-year Bachelor of IT student majoring in Digital Innovation. I’m particularly interested in project management and enjoy coordinating teams, solving problems, and keeping projects on track to deliver successful outcomes.',
  },
  {
    name: 'Shehryar Shaukat',
    role: 'Business Analyst',
    img: '/teaminfo/shehryar.jpg',
    blurb:
      'hi, im Shehryar, a final year computer science student with expertise in software development, data analytics and business analysis. Interested in AI, user focused solution and turning requirements into real products.',
  },
  {
    name: 'Andi Jagila',
    role: 'UX Designer',
    img: '/teaminfo/andi.jpg',
    blurb:
      'hi! I’m Andi, a final year IT student working on the UX side of the project. I focus on creating clear, intuitive and user friendly experiences that make the product easy and enjoyable to use',
  },
  {
    name: 'Lam Manh Tuan',
    role: 'Developer 1',
    img: '/teaminfo/nick.jpg',
    blurb:
      "Hey! I'm Tuan, a third-year RMIT student majoring in Artificial Intelligence! I'm one of the developers of this team, and hopefully I'll be able to contribute my full-stack experience to the project!",
  },
  {
    name: 'Rishi Sood',
    role: 'Developer 2',
    img: '/teaminfo/rishi.jpg',
    blurb:
      "Hi there! I'm Rishi, an RMIT Computer Science student (Cybersecurity major) and one of the project's two developers. I focus on building the AI companion's functionality and bringing a security-minded eye to how it's all put together.",
  },
]

export default function TeamInfo() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-2xl font-bold tracking-tight">Team 23</h1>
        <p className="mt-1 text-sm text-zinc-500">
          The people behind Telstra Health - UX Research Companion
        </p>
        <div className="text-foreground absolute top-1 right-5 flex h-6.5 w-22.5 items-center justify-center rounded-full border border-[#E4E4E7] bg-[#F4F4F5] text-center text-xs dark:border-[#27272A] dark:bg-[#18181B]">
          {teamMembers.length} members
        </div>
      </div>
      <div className="flex flex-wrap gap-10 px-5">
        {teamMembers.map(({ name, role, img, blurb }) => (
          <div
            className="flex w-73.75 flex-col items-center justify-start rounded-md border border-[#E4E4E7] px-5 dark:border-[#27272A] dark:bg-[#18181B]"
            key={name}
          >
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="photoContainer my-5 flex h-65 w-65">
                {img ? (
                  <img className="h-65 w-65 rounded-lg object-cover" alt={name} src={img} />
                ) : (
                  <Skeleton width={260} height={260} containerClassName="flex-1 rounded-lg" />
                )}
              </div>
              <div className="textContainer flex w-full min-w-0 flex-col items-start gap-2 p-1">
                <p className="w-full text-lg font-semibold">{name}</p>
                <div className="text-foreground flex h-6.5 items-center justify-center rounded-full border border-[#E4E4E7] bg-[#F4F4F5] p-3 text-center text-xs dark:border-[#27272A] dark:bg-[#18181B]">
                  {role}
                </div>
                {blurb ? (
                  <div className="mb-5 w-full">
                    <p className="text-md line-clamp-3 text-zinc-400">"{blurb}"</p>
                    <button className="text-theme cursor-pointer text-sm hover:underline">
                      Read more
                    </button>
                  </div>
                ) : (
                  <Skeleton width="100%" count={5} containerClassName="flex-1" />
                )}
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </div>
    </div>
  )
}
