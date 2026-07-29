import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-bold whitespace-nowrap transition-all outline-none select-none active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-[#58cc02] text-white border-b-4 border-[#46a302] hover:bg-[#61df02] active:border-b-2",
        outline:
          "bg-white border-2 border-[#a5ed6e] border-b-4 border-b-[#a5ed6e] text-[#58cc02] hover:bg-[#f7feef] active:border-b-2",
        secondary:
          "bg-[#1cb0f6] text-white border-b-4 border-[#1899d6] hover:bg-[#20b8ff] active:border-b-2",
        ghost:
          "bg-transparent text-[#777777] hover:bg-slate-100 hover:text-[#3c3c3c] border-b-0 active:translate-y-0",
        destructive:
          "bg-[#ff4b4b] text-white border-b-4 border-[#ea2b2b] hover:bg-[#ff5c5c] active:border-b-2",
        link: "text-[#1cb0f6] underline-offset-4 hover:underline border-b-0 active:translate-y-0 lowercase tracking-normal font-semibold",
        duoOutline:
          "bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] text-[#3c3c3c] hover:bg-slate-50 hover:border-slate-300 active:border-b-2",
      },
      size: {
        default:
          "h-11 px-5 py-2.5 text-sm gap-2",
        xs: "h-7 rounded-lg px-2.5 text-xs gap-1 text-[11px]",
        sm: "h-9 rounded-xl px-3.5 text-xs gap-1.5",
        lg: "h-13 px-7 text-base gap-2.5",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
