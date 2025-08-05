// app/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Breadcrumbs } from '@/core/components/Breadcrumbs'
import { AppSidebar } from '@/core/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen text-foreground">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  )
}
