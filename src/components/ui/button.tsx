import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        "primary-default": "bg-sidebar text-primary-foreground hover:bg-sidebar-primary active:bg-popover cursor-pointer",
        "primary-outline": "border-2 border-sidebar text-sidebar hover:bg-sidebar hover:text-primary-foreground cursor-pointer",
        "primary-link": "text-sidebar underline-sidebar-4 hover:underline cursor-pointer",
        "success-default": "bg-success text-primary-foreground hover:bg-success-main-hover active:bg-success cursor-pointer",
        "success-outline": "border-2 border-success text-success hover:bg-success hover:text-primary-foreground cursor-pointer",
        "success-link": "text-success underline-success-4 hover:underline cursor-pointer",
        "warning-default": "bg-secondary-foreground text-primary-foreground hover:bg-warning-main-hover active:bg-warning cursor-pointer",
        "warning-outline": "border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-primary-foreground cursor-pointer",
        "warning-link": "text-secondary-foreground underline-secondary-foreground-4 hover:underline cursor-pointer",
        "danger-default": "bg-destructive text-primary-foreground hover:bg-danger-main-hover active:bg-danger-main-active cursor-pointer",
        "danger-outline": "border-2 border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground cursor-pointer",
        "danger-link": "text-destructive underline-destructive-4 hover:underline cursor-pointer",
        "disabled-default": "bg-outline-2 text-secondary cursor-pointer",
        "disabled-outline": "border-2 border-outline-2 text-secondary cursor-pointer",
        "disabled-disabled": "text-secondary cursor-pointer",
        "disabled-link": "text-typo-secondary underline-typo-secondary-4 cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary-default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
