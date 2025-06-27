"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/site";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";

interface SidebarNavProps {
  items: NavItem[];
  className?: string;
}

export function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn("flex flex-col h-full", className)}>
      <SidebarMenu className="flex-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const translatedTitle = t(item.title);
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.tooltip || translatedTitle}
                aria-label={translatedTitle}
              >
                <Link href={item.href}>
                  <Icon />
                  <span>{translatedTitle}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </nav>
  );
}
