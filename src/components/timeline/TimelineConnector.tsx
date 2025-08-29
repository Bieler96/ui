import clsx from "clsx";
import React, { forwardRef } from "react";

export const TimelineConnector = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx("flex-1 border-l border-gray-300", className)}
      {...props}
    />
  );
});

TimelineConnector.displayName = "TimelineConnector";