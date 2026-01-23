import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `
      h-[20px] w-[20px]
      rounded-sm
      border border-[#D0D5DD]
      bg-white
      flex items-center justify-center
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#D0D5DD]
      focus-visible:ring-offset-2

      data-[state=checked]:bg-white
      data-[state=checked]:border-[#D0D5DD]
      `,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="h-3 w-3 text-[#101828]" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
