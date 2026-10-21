import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-teal-500 text-slate-950 hover:bg-teal-400", secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200", outline: "border border-slate-300 bg-transparent text-slate-900 hover:border-teal-500 hover:bg-teal-50", ghost: "text-slate-700 hover:bg-slate-100", dark: "bg-[#102A4C] text-white hover:bg-[#183b65]" }, size: { default: "h-11 px-6", sm: "h-9 px-4 text-xs", lg: "h-13 px-8 text-base", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } });
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button"; return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />; });
Button.displayName = "Button";
