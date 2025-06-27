import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, FileText, CalendarDays, MessageCircle, Sparkles, Bell, Settings, UserCircle, HeartPulse } from 'lucide-react';

export const APP_NAME = "Medicinae";
export const APP_LOGO_ICON = HeartPulse;

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  tooltip?: string;
}

export const mainNavItems: NavItem[] = [
  { title: "sidebar.dashboard", href: "/dashboard", icon: LayoutDashboard, tooltip: "Overview" },
  { title: "sidebar.documents", href: "/documents", icon: FileText, tooltip: "Medical Records" },
  { title: "sidebar.appointments", href: "/appointments", icon: CalendarDays, tooltip: "Schedule" },
  { title: "sidebar.messages", href: "/messages", icon: MessageCircle, tooltip: "Communicate" },
  { title: "sidebar.aiAssistant", href: "/assistant", icon: Sparkles, tooltip: "Health AI" },
  { title: "sidebar.notifications", href: "/notifications", icon: Bell, tooltip: "Alerts" },
];

export const footerNavItems: NavItem[] = [
    { title: "sidebar.settings", href: "/settings", icon: Settings, tooltip: "App Settings" },
    { title: "sidebar.profile", href: "/profile", icon: UserCircle, tooltip: "User Profile" },
];
