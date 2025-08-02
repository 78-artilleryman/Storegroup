import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  className?: string;
}

function Switch({ className = "", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={`peer inline-flex h-6 w-[43px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 ${className}`}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[21px] data-[state=unchecked]:translate-x-[2px]" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
