import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}

const addClassNameRecursively = (
  children: ReactNode,
  className: string
): ReactNode => {
  const foo = (child: ReactNode) => {
    if (!isValidElement(child)) return child;

    const el = child as React.ReactElement<{ className?: string; style?: React.CSSProperties; children?: ReactNode }>;
    return cloneElement(el, {
      className: `${el.props.className || ""} ${className}`.trim(),
      style: { ...el.props.style, pointerEvents: "none" },
      children: addClassNameRecursively(el.props.children, className),
    });
  };
  return Children.map(children, foo);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "cursor-can-hover"
        )}
        ref={ref}
        {...props}
      >
        {/* add pointer-events-none to every child recursively */}
        {addClassNameRecursively(children, "pointer-events-none")}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
