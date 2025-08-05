'use client'

import React from 'react'
import {
  Dumbbell,
  HeartPulse,
  CalendarClock,
  BarChart3,
  Settings,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

type NavItem = {
  title: string
  url: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: 'Workouts',
    url: '/dashboard/workouts',
    icon: Dumbbell,
  },
  {
    title: 'Progress',
    url: '/dashboard/progress',
    icon: BarChart3,
  },
  {
    title: 'Nutrition',
    url: '/dashboard/nutrition',
    icon: HeartPulse,
  },
  {
    title: 'Schedule',
    url: '/dashboard/schedule',
    icon: CalendarClock,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
]

export const AppSidebar: React.FC = () => (
  <Sidebar className="bg-black text-white border-r border-zinc-800">
    <SidebarContent className="bg-black/90 px-3 py-6">
      <SidebarGroup>
        <SidebarGroupLabel className="text-green-500 text-sm font-semibold uppercase tracking-wide px-2">
          Fitness Panel
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map(({ title, url, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton asChild>
                  <a
                    href={url}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors text-sm"
                  >
                    <Icon className="w-5 h-5 text-green-500" />
                    <span>{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
)
