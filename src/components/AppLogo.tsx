
import { APP_NAME, APP_LOGO_ICON } from "@/config/site";
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface AppLogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
  linkHref?: string;
}

export function AppLogo({ 
  className, 
  iconSize = 24, 
  textSize = "text-xl", 
  showText = true,
  linkHref = "/dashboard" 
}: AppLogoProps) {
  const LogoIcon = APP_LOGO_ICON;
  return (
    <Link href={linkHref} className={cn("flex items-center gap-2 group", className, "group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center")}>
      <div className={cn(
        "bg-primary text-primary-foreground p-2 rounded-lg group-hover:bg-primary/90 transition-colors shadow-sm flex-shrink-0"
        // Removed group-data-[collapsible=icon]:hidden to always show the icon
      )}>
        <LogoIcon size={iconSize} />
      </div>
      {showText && (
        <span className={cn(
          "font-bold font-headline truncate", 
          textSize,
          "text-primary group-hover:text-primary/90 transition-colors",
          "group-data-[collapsible=icon]:hidden" // This correctly hides only the text
        )}>
          {APP_NAME}
        </span>
      )}
    </Link>
  );
}
