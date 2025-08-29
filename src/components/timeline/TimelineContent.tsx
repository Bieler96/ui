import clsx from "clsx";
import React, { forwardRef } from "react";

export const TimelineContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx("pb-8", className)} {...props} />;
});

TimelineContent.displayName = "TimelineContent";