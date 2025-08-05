import clsx from "clsx";
import React from "react";

export interface TopNavBarItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TopNavBarItems({
  children,
  className,
  ...props
}: TopNavBarItemsProps) {
  return (
    <div className={clsx("flex-grow flex justify-center", className)} {...props}>
      <ul className="flex space-x-4">
        {children}
      </ul>
    </div>
  );
}
