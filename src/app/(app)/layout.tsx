
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/AppLogo";
import { SidebarNav } from "@/components/SidebarNav";
import { mainNavItems, footerNavItems } from "@/config/site";
import { Menu } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center group-data-[collapsible=icon]:justify-start group-data-[state=expanded]:justify-between">
             <AppLogo /> {/* AppLogo will now hide itself entirely when group-data-[collapsible=icon] is active */}
             <SidebarTrigger className="p-1 h-auto w-auto"> 
                <Menu size={20}/>
             </SidebarTrigger> 
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav items={mainNavItems} />
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarNav items={footerNavItems} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-start h-14 px-4 border-b bg-background/80 backdrop-blur-sm md:hidden">
            <SidebarTrigger className="p-1 h-auto w-auto">
                <Menu size={20} />
            </SidebarTrigger> 
        </header>
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
