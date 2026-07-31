import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-semibold whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-xs",
        outline:
          "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]",
        secondary:
          "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-xs",
        ghost:
          "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]",
        link: "text-emerald-600 underline-offset-4 hover:underline font-semibold",
        duoPrimary:
          "bg-[#58cc02] text-white border-b-4 border-[#46a302] hover:bg-[#61df02] active:border-b-2 font-bold uppercase tracking-wider",
        duoSecondary:
          "bg-[#1cb0f6] text-white border-b-4 border-[#1899d6] hover:bg-[#20b8ff] active:border-b-2 font-bold uppercase tracking-wider",
        duoOutline:
          "bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#e5e5e5] text-[#3c3c3c] hover:bg-slate-50 hover:border-slate-300 active:border-b-2 font-bold uppercase tracking-wider",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm gap-2",
        xs: "h-7 rounded-lg px-2.5 text-[11px] gap-1",
        sm: "h-8.5 rounded-xl px-3 text-xs gap-1.5",
        lg: "h-12 px-6 text-base gap-2.5",
        icon: "size-9 rounded-xl",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-11 rounded-xl",
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
