import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  onClick?: () => void;
};

export default function SidebarLink({
  href,
  label,
  icon,
  className = "",
  isActive = false,
  hasSubmenu = false,
  isSubmenuOpen = false,
  onClick,
}: SidebarLinkProps) {
  return (
    <div onClick={onClick}>
      <Link href={href} className={`block ${className}`}>
        <div
          className={
            `flex items-center justify-start md:justify-center lg:justify-start px-4 py-3 w-full rounded-lg text-sm font-medium hover:text-sidebar 
            ${isActive ? "text-sidebar bg-sidebar-accent" : "text-muted-foreground"
            }`
          }
        >
          {icon}
          <span className="ml-2 md:hidden lg:inline">{label}</span>
          {hasSubmenu && (
            <ChevronDown
              className={cn(
                'ml-auto md:hidden lg:inline transition-transform duration-300',
                isSubmenuOpen && 'rotate-180'
              )}
            />
          )}
        </div>
      </Link>
    </div>
  );
}
