import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Pill buttons (design.md §2, §6): violet spot-ink primary, line-strong outline,
// violet-text link. Fill shifts to violet-press and a trailing icon
// (data-icon="inline-end") nudges 4px right on hover, 150ms ease-out.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-pill border border-transparent bg-clip-padding font-sans font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-text disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg[data-icon=inline-end]]:transition-transform [&_svg[data-icon=inline-end]]:duration-150 [&_svg[data-icon=inline-end]]:ease-out hover:[&_svg[data-icon=inline-end]]:translate-x-1",
  {
    variants: {
      variant: {
        default:
          "bg-violet text-white hover:bg-violet-press active:bg-violet-press aria-expanded:bg-violet-press",
        outline:
          "border-line-strong bg-transparent text-paper hover:border-mute hover:bg-raised aria-expanded:bg-raised",
        secondary:
          "bg-raised text-paper hover:bg-line aria-expanded:bg-line",
        ghost:
          "text-paper hover:bg-raised aria-expanded:bg-raised",
        destructive:
          "bg-destructive/15 text-destructive hover:bg-destructive/25",
        link: "text-violet-text underline decoration-violet-text/40 decoration-1 underline-offset-[0.3em] hover:decoration-violet-text",
      },
      size: {
        default:
          "h-11 gap-2 px-5 text-[0.9375rem] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-13 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-5",
        xl: "h-16 gap-2.5 px-8 text-lg has-data-[icon=inline-end]:pr-7 has-data-[icon=inline-start]:pl-7 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-14 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    compoundVariants: [
      // A link is text, not a pill: drop the box and keep the size's type.
      {
        variant: "link",
        className: "h-auto rounded-none px-0 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0",
      },
    ],
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
