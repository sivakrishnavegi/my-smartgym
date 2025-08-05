// components/dashboard/Sidebar.tsx
'use client'

import { Home, Users, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-background border-r border-border px-4 py-6">
      <div className="text-xl font-bold text-green-600 mb-8">HulkGains</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent transition-colors text-sm"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
