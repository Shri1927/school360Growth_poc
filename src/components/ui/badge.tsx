import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider transition-all select-none",
  {
    variants: {
      variant: {
        default: "bg-[#eefce8] text-[#58cc02] border-[#a5ed6e]",
        secondary: "bg-[#f0f9ff] text-[#1cb0f6] border-[#1cb0f6]",
        destructive: "bg-[#fff0f0] text-[#ff4b4b] border-[#ff4b4b]",
        outline: "bg-white text-[#4b4b4b] border-[#e5e5e5]",
        ghost: "bg-transparent text-[#777777] border-transparent",
        dark: "bg-[#042c60] text-white border-[#042c60]",
        gold: "bg-[#fffbeb] text-[#d97706] border-[#fde68a]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
