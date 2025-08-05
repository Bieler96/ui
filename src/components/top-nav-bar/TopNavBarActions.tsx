import clsx from "clsx";
import React from "react";

export interface TopNavBarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TopNavBarActions({
  children,
  className,
  ...props
}: TopNavBarActionsProps) {
  return (
    <div className={clsx("flex items-center space-x-4", className)} {...props}>
      {children}
    </div>
  );
}
