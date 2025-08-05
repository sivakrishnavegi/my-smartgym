// components/ui/Breadcrumbs.tsx
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav className="text-sm text-gray-500 flex items-center gap-2">
      <Link href="/dashboard" className="hover:text-green-500 transition">
        Dashboard
      </Link>
      {segments.slice(1).map((segment, index) => {
        const href = '/' + segments.slice(0, index + 2).join('/')
        const isLast = index === segments.length - 2

        return (
          <React.Fragment key={href}>
            <ChevronRight size={16} />
            {isLast ? (
              <span className="text-gray-400 capitalize">{segment}</span>
            ) : (
              <Link href={href} className="capitalize hover:text-green-500 transition">
                {segment}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
