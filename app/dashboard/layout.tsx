// app/dashboard/layout.tsx
import { Sidebar } from "@/core/components/Sidebar";
import { TopNav } from "@/core/components/TopNav";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
