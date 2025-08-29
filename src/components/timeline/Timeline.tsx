import clsx from "clsx";
import React, { forwardRef } from "react";

export const Timeline = forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={clsx("flex flex-col", className)}
      {...props}
    />
  );
});

Timeline.displayName = "Timeline";