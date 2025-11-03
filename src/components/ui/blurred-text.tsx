import * as React from "react";
import { cn } from "@/lib/utils";

export interface BlurredTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  isLoading: boolean;
  placeholder?: string;
  children: React.ReactNode;
}

const BlurredText = React.forwardRef<HTMLSpanElement, BlurredTextProps>(
  ({ isLoading, placeholder = "0000", children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <span
          className={cn(
            "transition-all duration-200 ease-out-cubic",
            isLoading ? "blur-sm select-none opacity-40" : "blur-0 opacity-100"
          )}
          style={{
            willChange: isLoading ? "filter" : "auto",
          }}
        >
          {isLoading ? placeholder : children}
        </span>
      </span>
    );
  }
);

BlurredText.displayName = "BlurredText";

export { BlurredText };
