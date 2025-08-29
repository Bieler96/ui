import clsx from "clsx";
import React, { forwardRef } from "react";

export const TimelineItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={clsx("flex gap-4", className)}
      {...props}
    />
  );
});

TimelineItem.displayName = "TimelineItem";