import clsx from "clsx";
import React, { forwardRef } from "react";

export const TimelinePoint = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "flex flex-col items-center",
        className
      )}
      {...props}
    />
  );
});

TimelinePoint.displayName = "TimelinePoint";